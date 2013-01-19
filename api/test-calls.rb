require "net/http"
require "uri"

$uri = URI.parse("http://localhost:9292/lists")

# Shortcut
# response = Net::HTTP.get_response(uri)

# Will print response.body

def postIt
  title = "testing"
  http = Net::HTTP.new($uri.host, $uri.port)
  http.post($uri.path, title)
end

def getIt
  puts Net::HTTP.get($uri)
end

postIt
# getIt