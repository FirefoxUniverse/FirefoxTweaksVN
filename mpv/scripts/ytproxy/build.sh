#!/bin/sh
# installation script for the lazy
# this script assumes rust toolchain (https://rustup.rs/) and openssl are installed
# should also work in windows assuming you edit ~/.config/mpv to your mpv dir
set -eux
git clone https://gist.github.com/253347b2c9a53bbd6087f086970106b6.git ytrangefix
cd ytrangefix
mkdir src
cp main.rs src/
cargo build --release

# install lua script to mpv dir
scriptdir=~/.config/mpv/scripts/ytrangefix
mkdir -p $scriptdir
cp target/release/http-ytproxy $scriptdir/
cp ytproxy.lua $scriptdir/main.lua
cd $scriptdir
# generate private keys for mitm proxy (they don't matter)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 3650 -passout pass:"third-wheel" -subj "/C=US/ST=private/L=province/O=city/CN=hostname.example.com"
echo done!
