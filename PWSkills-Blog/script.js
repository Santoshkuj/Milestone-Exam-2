let url = document.getElementById("url");
let title = document.getElementById("title");
let description = document.getElementById("description");
let textarea = document.getElementById("textarea");
let add = document.getElementById("add");
const button = document.querySelector(".button");
const read = document.querySelector(".read");
const card = document.querySelector(".card");
const form = document.querySelector(".form");
const cross = document.querySelector(".cross");

let blog = JSON.parse(localStorage.getItem("blog"));

add.addEventListener("click", () => {
    form.style.display = "flex";
});
cross.addEventListener("click", () => {
    form.style.display = "none";
});
const reset = () => {
    url.value = "";
    description.value = "";
    title.value = "";
    textarea.value = "";
};
button.addEventListener("click", () => {
    let object = {
        url: `${url.value.trim()}`,
        title: `${title.value.trim()}`,
        description: `${description.value.trim()}`,
        textarea: `${textarea.value.trim()}`,
    };
    if ((url.value && title.value && description.value && textarea.value) !== "") {
        let array;
        if (!blog) {
            array = [];
        } else {
            array = JSON.parse(localStorage.getItem("blog"));
        }
        array.push(object)
        localStorage.setItem("blog", JSON.stringify(array));
        reset();
        showBlogs()
        setTimeout(() => {
            form.style.display = "none";
        }, 500);
    } else {
        alert("please fill in all fields");
    }
});
function showBlogs() {
    card.innerHTML = '';
    let blog = JSON.parse(localStorage.getItem("blog"));
    if (!blog) {
        return;
    }
    blog.forEach((el) => {
        const blogs = document.createElement("div");
        blogs.classList.add("blog");
        blogs.innerHTML = `
                <img src="${el.url}" alt = 'blog.img'/>
                <h2>${el.title}</h2>
                <p>${el.description}</p>`;
        const button = document.createElement('button')
        button.id = 'read'
        button.innerHTML = 'Read'
        blogs.appendChild(button)
        card.appendChild(blogs);
        button.addEventListener('click', (e) => {
            let blogTitle = e.target.parentElement.children[1].innerHTML;
            let index = blog.findIndex((el,i)=>{
                if(el.title == blogTitle){return ()=>{i=((i==0)?0:i)}}
            });
            let newWindow = window.open("","_self");

            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>Blog Details</title>
                </head>
                <body>
                   <nav>
                    <div>PWSkills Blog</div>
                    <a href="./index.html"><div id="prev">&lt;&lt;</div></a>
                    </nav>
                    <div class="container">
                    <div class="main">
                        <div class="left">
                        <h2>${blog[index].title}</h2>
                        <p>${blog[index].description}</p>
                        </div>
                        <img src="${blog[index].url}" alt="blogimg">
                    </div>
                        <p class="paragraph">${blog[index].textarea}</p>
                    </div>
                </body>
                </html>
            `);
        })
    });
}
document.addEventListener("DOMContentLoaded", showBlogs);
