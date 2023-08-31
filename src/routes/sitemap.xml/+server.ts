
 //list of posts containing a slug [{title: "Test title", slug: "test-title", updatedAt: "2023-01-01"}]

 const pages = ['auth', 'bookmarks'] //list of pages as a string ex. ["about", "blog", "contact"]

 const site = "https://extvweb.vercel.app"
 
 /**
  * @param {string | number | Date} inputDate
  */
 function formatDate(inputDate: string | number | Date) {
     const date = new Date(inputDate);
     
     const year = date.getUTCFullYear();
     const month = String(date.getUTCMonth() + 1).padStart(2, '0');
     const day = String(date.getUTCDate()).padStart(2, '0');
     const hours = String(date.getUTCHours()).padStart(2, '0');
     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
     
     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} +00:00`;
     return formattedDate;
   }

 export async function GET({  locals }) {
    // console.log(locals)
    const posts  =await locals.BOOK.find().sort({updatedAt: -1})
     const body = sitemap(posts, pages);
     const response = new Response(body);
     response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
     response.headers.set('Content-Type', 'application/xml');
     return response;
 }
 
 const sitemap = (/** @type {any[]} */ posts: any[], /** @type {any[]} */ pages: any[]) => `<?xml version="1.0" encoding="UTF-8" ?>
 <urlset
   xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
   xmlns:xhtml="https://www.w3.org/1999/xhtml"
   xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
   xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
   xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
 >
   <url>
     <loc>${site}</loc>
     <changefreq>daily</changefreq>
     <priority>0.7</priority>
   </url>
   ${pages.map((/** @type {any} */ page: any) => `
   <url>
     <loc>${site}/${page}</loc>
     <changefreq>daily</changefreq>
     <priority>0.7</priority>
   </url>
   `).join('')}
   ${posts.map((/** @type {{ _id: any; title: any; updatedAt: any; }} */ post: { _id: any; title: any; updatedAt: any; }) =>`
   <url>
     <loc>${site}/book/${post._id}/${post.title}</loc>
     <changefreq>weekly</changefreq>
     <lastmod>${formatDate(post.updatedAt)}</lastmod>
     
     <priority>0.3</priority>
   </url>
   `
         )
         .join('')}
 </urlset>`;