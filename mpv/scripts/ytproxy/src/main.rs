use argh::FromArgs;
use third_wheel::hyper::{Request, Body};
use third_wheel::hyper::http::HeaderValue;
use third_wheel::hyper::service::Service;
use third_wheel::*;

/// Run a TLS mitm proxy that modifies Range header to be http_chunk_size bytes.
#[derive(FromArgs)]
struct StartMitm {
    /// port to bind proxy to
    #[argh(option, short = 'p', default = "8080")]
    port: u16,

    /// pem file for self-signed certificate authority certificate
    #[argh(option, short = 'c', default = "\"cert.pem\".to_string()")]
    cert_file: String,

    /// pem file for private signing key for the certificate authority
    #[argh(option, short = 'k', default = "\"key.pem\".to_string()")]
    key_file: String,

    /// range header chunk
    #[argh(option, short = 'r', default = "10485760")]
    http_chunk_size: u64,
}


fn mitm(mut req: Request<Body>, mut third_wheel: ThirdWheel, http_chunk_size:u64) -> <ThirdWheel as Service<Request<Body>>>::Future {
    //println!("req: {}", req.uri());
    let hdr = req.headers_mut();
    if let Some(val) = hdr.get("Range") {
        let range = val.to_str().unwrap();
        //println!("Range: {}", range);
        if range.starts_with("bytes=") {
            if let Some((p1, _p2)) = range[6..].split_once('-') {
                if let Ok(start) = p1.parse::<u64>() {
                    let newrange = format!("bytes={}-{}", start, start + http_chunk_size);
                    //println!("-> {}",newrange);
                    hdr.insert("Range", HeaderValue::from_str(&newrange).unwrap());
                }
            }
        }
    }
    third_wheel.call(req)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let args: StartMitm = argh::from_env();
    let ca = CertificateAuthority::load_from_pem_files_with_passphrase_on_key(
        &args.cert_file,
        &args.key_file,
        "third-wheel",
    )?;
    let trivial_mitm =
        mitm_layer(move |req, tw| mitm(req,tw, args.http_chunk_size) );
    let mitm_proxy = MitmProxy::builder(trivial_mitm, ca).build();
    let (_, mitm_proxy_fut) = mitm_proxy.bind(format!("127.0.0.1:{}", args.port).parse().unwrap());
    mitm_proxy_fut.await.unwrap();
    Ok(())
}
