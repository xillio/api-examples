# Xillio API Examples

This project contains examples of how to use the Xillio API to access content. These samples work against the API Sandbox: https://sandbox.xill.io.

The samples in this folder demonstrate how to call the API from the command line. In order to run these examples you need to install curl if it is not already installed on your system. See https://curl.haxx.se/ for details.

Open a commandline or terminal window and go into the curl directory
```
cd curl
```

On unix systems you can make the files executable by running:

```
chmod +x ping ping-headers get-token get-root get-folder
```

Or you can copy the contents of the file and past it on the commandline and substitute the variables.

## Ping

Run the following command on the command line
```
./ping
```
This calls the [/v2/system/ping](https://docs.xill.io/#api_system_ping) endpoint. You can open the `ping` file in your favorite editor to examine the curl call.

## Ping with headers

Run the following command on the command line
```
./ping-headers
```
This calls the [/v2/system/ping endpoint](https://docs.xill.io/#api_system_ping) as well, but it will also output all HTTP response headers. You can open the `ping-headers` file in your favorite editor to examine the curl call.

## Get an OAUTH access token

Most of the API calls require authentication. (The ping call is an exception). Authentication is done via OAUTH. In order to use that you first need to request an access token using the clientid, clientsecret, username and password. 

```
./get-token <clientid> <clientsecret> <username> <password>
```

Specify the `<clientid>`, `<clientsecret>`, `<username>` and `<password>` that you've received for the sandbox after registration.
This calls the [/oauth/token]( https://docs.xill.io/#api_oauth_token) endpoint. The result should look something like:
```
{
  "access_token" : "abcdefgiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsieGlsbGlvX2FwaSJdLCJ1c2VyX25hbWUiOiJ4aWxsaW8iLCJzY29wZSI6WyJ1c2VyIiwidXNlcnMiLCJjb25maWd1cmF0aW9ucyIsImVudGl0aWVzIiwiY29udGVudHMiXSwiZXhwIjoxNTE3ODc1NDYwLCJhdXRob3JpdGllcyI6WyJST0xFX0VOVElUWV9BRE1JTiIsIlJPTEVfRU5USVRZX1VTRVIiXSwianRpIjoiZjY1ZTk0YWQtNjI5Yi00MzU4LWE5MzAtZDUwYjA2Y2Y0OGY0IiwiY2xpZW50X2lkIjoieGlsbGlvc2FuZGJveCJ9.6JVZt44XnWnEKiWuKDwEhbbnOzbiVNBmUFabcdefgh",
  "token_type" : "bearer",
  "expires_in" : 43200,
  "scope" : "user users configurations entities contents",
  "jti" : "e99e99aa-999a-4358-a930-d50b06cf48f4"
}
```
You can copy the contents of the `access_token` field. This is needed as an input value for the other calls below. You can open the `get-token` file in your favorite editor to examine the curl call.

## Get the list of configurations

```
./get-root <token>
```
Replace `<token>` with the value of the access_token field from the `get-token` command. You can open the `get-root` file in your favorite editor to examine the curl call.

## Get a folder

```
./get-folder <token> <path>
```

You can open the `get-folder` file in your favorite editor to examine the curl call.