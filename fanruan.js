export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 1. If the user visits the main page, serve the long chat URL quietly
    if (url.pathname === '/' || url.pathname === '') {
       const chatUrl = 'https://inodora.fanruan.com/webroot/decision/dora/chat/independent/67b6fa87-e6f3-4043-85a9-23559fdc0bc3';
       const modifiedRequest = new Request(chatUrl, request);
       modifiedRequest.headers.set('Host', 'inodora.fanruan.com');
       return fetch(modifiedRequest);
    }
    
    // 2. If the chat app asks for background files (images, styling), fetch them dynamically
    const targetUrl = new URL(url.pathname + url.search, 'https://inodora.fanruan.com');
    const modifiedAssetRequest = new Request(targetUrl, request);
    modifiedAssetRequest.headers.set('Host', 'inodora.fanruan.com');
    
    return fetch(modifiedAssetRequest);
  }
}
