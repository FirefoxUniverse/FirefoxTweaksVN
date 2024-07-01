local function init()
    local url = mp.get_property("stream-open-filename")
    -- check for youtube link
    if url:find("^https:") == nil or url:find("youtu") == nil then
        return
    end

    local proxy = mp.get_property("http-proxy")
    if proxy and proxy ~= "" and proxy ~= "http://127.0.0.1:12081" then
        return
    end

    -- launch mitm proxy
    local args = {
        mp.get_script_directory() .. "/http-ytproxy",
        "-c", mp.get_script_directory() .. "/cert.pem",
        "-k", mp.get_script_directory() .. "/key.pem",
        "-r", "10485760", -- range modification
        "-p", "12081" -- proxy port
    }
    mp.command_native_async({
        name = "subprocess",
        capture_stdout = false,
        playback_only = false,
        args = args,
    });

    mp.set_property("http-proxy", "http://127.0.0.1:12081")
    mp.set_property("tls-verify", "no")
    -- this is not really needed
    --mp.set_property("tls-verify", "yes")
    --mp.set_property("tls-ca-file", mp.get_script_directory() .. "/cert.pem")
end

mp.register_event("start-file", init)
