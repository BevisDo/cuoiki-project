function start() {
    if (window.location.pathname == '/') {
        getPosts(render)
    }else {
        var url = window.location.pathname
        var id = url.slice(10)
        getPostsById(id, render)
    }    
    handlecreate()
}
start();
function getPosts(callback) {
    fetch('/posts', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
        },
    })
    .then(function (response)
    {
        return response.json();
    })
    .then(callback);
}

function getPostsById(id, callback) {
    fetch('/posts/' + id, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
        }
    })
    .then(function (response){
        return response.json();
    })
    .then(callback);
}


function render(posts) {
    var listPosts =document.querySelector("#status")
    // console.log(posts.post)
    var htmls=posts.post.slice(0).reverse().map(function (e) {
        return `
            <div class="card post-${e._id}">
                <div class="d-flex justify-content-between p-2 px-3">
                    <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg"
                            width="50px" class="rounded-circle">
                        <div class="d-flex flex-column ml-2">
                            <a class="font-weight-bold text-dark username" href="/personal/${e.user._id}">${e.user.username}</a>
                        </div>
                    </div>
                    <div class="d-flex flex-row mt-1 ellipsis ml-auto"> 
                        <small class="mr-2">20 mins</small>
                        <div class="dropleft show">
                            <a class="fa fa-ellipsis-h" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                            <div class="dropdown-menu bg-secondary text-white" aria-labelledby="dropdownMenuLink">
                                <button id="${e._id}" class="dropdown-item delete-btn" onclick="deletePost(\'${e._id}\')">Xoá bài viết</button>
                                <button type="button" class=" dropdown-item" data-toggle="modal" data-target="#changePost" onclick="handlechange(\'${e._id}\')">Sửa bài viết</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="audio">
                    <!-- <img src="https://i.imgur.com/xhzhaGA.jpg" class="img-fluid"> -->
                </div>
    
                <div class="p-2">
                    <p class="text-justify content">${e.content}</p>
    
                    <hr>
    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row icons d-flex align-items-center"><i
                                class="fa fa-thumbs-up mx-3"></i> </div>
                        <div class="d-flex flex-row muted-color"> <span>2 comments</span> <span
                                class="ml-2">Share</span> </div>
                    </div>
    
                    <hr>
    
                    <div class="comments">
    
                        <div class="d-flex flex-row mb-2"> <img src="https://i.imgur.com/9AZ2QX1.jpg" width="40"
                                class="rounded-image">
                            <div class="d-flex flex-column ml-2"> <span class="name">Daniel Frozer</span> <small
                                    class="comment-text">I like this alot! thanks alot</small>
                                <div class="d-flex flex-row align-items-center comment-func">
                                    <small>Like</small>
                                    <small>Reply</small> <small>18 mins</small>
                                </div>
                            </div>
                        </div>
    
                        <div class="comment-input"> <input type="text" class="form-control"
                                placeholder="Write a comment...">
                            <div class="fonts"> <i class="fa fa-camera"></i> </div>
                        </div>
                    </div>
                </div>
            </div>`
    })

    listPosts.innerHTML=htmls.join("");
    // var ele10 = [] //Chua 1 lan 10 posts
    // var tmp = 0
    // for (let i = 0; i < htmls.length; i++) {
    //     if (i <= 9) {
    //         ele10.push(htmls[i])
    //     }else {
    //         tmp = i
    //         listPosts.innerHTML=ele10.join("");
    //         ele10 = [];
    //         break;
    //         count()
    //     }
    // }

    // document.addEventListener('scroll', function() {
        
    //     a = window.scrollY
    //     var bottom = $(document).height() - $(window).height()

    //     if(a>bottom)
    //     {   
    //         count(tmp, htmls)
    //         // $(ele10).appendTo(listPosts)
    //         // ele10 = []
    //     }
    // })

    
}

function createPosts(data,callback) {
    var Options={
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/posts/create',Options)
    .then(function (response) {
        response.json();//promise resolves dạng JSON
    })
    .then(callback)
}

function handlecreate()
{
    var createBtn = document.querySelector('#post-btn')
    if (createBtn) {
        createBtn.onclick = function()
        {
            var content = document.querySelector('#content').value;
            var formdata = {
                content: content
            }
            if (content != '') {
                createPosts(formdata,function(){    
                    getPosts(render)
                });
            }else {
                alert('Vui long nhap noi dung bai viet')
            }
            $("#content").val('');
        }
    }
}

function change(id,data,callback) 
{
    var Options={
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/posts' + '/' + id, Options)
    .then(function (response) {
        response.json();
        if(response.status == 401 && response.statusText == "Unauthorized") {
            throw new Error("Ban khong the sua bai viet cua nguoi khac")
        }else if(response.status == 400 && response.statusText == "Bad Request") {
            throw new Error("Vui long nhap noi dung muon thay doi")
        }
    })
    .then(callback)
    .catch(function(err) {
        alert(err)
    })
}

function handlechange(id)
{
    var postItem = document.querySelector(".post-" + id);
    var getContent = postItem.querySelector(".content").innerText;

    var contentChange=document.querySelector("#contentChange")

    contentChange.value=getContent;

    var btnUpdate=document.querySelector("#change-btn")
    btnUpdate.onclick=function(){
        var formData = {
            content: contentChange.value,
        };
        contentChange.value = ''
        change(id,formData,function(){
            start(); //thay cho dong tren
        })
    }
}

function deletePost(id)
{
    var Options={
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
    }
    fetch('/posts' + '/' + id, Options)// giống postman course/id để xóa 
    .then(function (response) {
        response.json();//promise resolves dạng JSON
        if(response.status == 401 && response.statusText == "Unauthorized") {
            throw new Error("Unauthorized")
        }
    })
    .then(function () {
    var postItem = document.querySelector('.post-'+id)
    if(postItem)
    {
        postItem.remove();
    }
    })
    .catch(function (err) {
        alert('Ban khong the xoa bai viet cua nguoi khac')
    })
}