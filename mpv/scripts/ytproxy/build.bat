@echo off

set "-eux"
git "clone" "https://gist.github.com/253347b2c9a53bbd6087f086970106b6.git" "ytrangefix"
cd "ytrangefix"
mkdir "src"
COPY  "main.rs" "src/"
cargo build --release
SET "scriptdir=~\.config\mpv\scripts\ytrangefix"
mkdir "-p" "%scriptdir%"
COPY  "target\release\http-ytproxy" "%scriptdir%/"
COPY  "ytproxy.lua" "%scriptdir%\main.lua"
cd "%scriptdir%"
openssl "req" "-x509" "-newkey" "rsa:4096" "-keyout" "key.pem" "-out" "cert.pem" "-days" "3650" "-passout" "pass:third-wheel" "-subj" "/C=US/ST=private/L=province/O=city/CN=hostname.example.com"
echo "done!"
