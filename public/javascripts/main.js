function start() {
    if (window.location.pathname == '/') {
        getPosts(render)
    } else {
        var url = window.location.pathname
        var id = url.slice(10)
        getPostsById(id, render)
    }
    handlecreate()
    handleChangeInfo()
}
start();

/*===== Auth function =====*/
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function login() {
    $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        }
    })
    .then(data => {
        setCookie('token', data.accessTokengg, 1)
        window.location.href = "/"
    })
    .catch(err => {
        console.log(err);
    })
}

/*===== UI function =====*/
//Auto height textarea 
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

// Show navbar
const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

// Link active
const linkColor = document.querySelectorAll('.nav__link')

function colorLink() {
    if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }
}
linkColor.forEach(l => l.addEventListener('click', colorLink))


/*===== VALIDATE FORM  =====*/
function validateLogin() {
    var username = document.getElementById('username')

    username.addEventListener('blur', function() {
        if (username.value == '') {
            alert('Please enter a username')
        }
    })

    var password = document.getElementById('password')

    password.addEventListener('blur', function() {
        if (password.value == '') {
            alert('Please enter a password')
        }
    })

    var confirm_password = document.getElementById('confirm_password')

    confirm_password.addEventListener('blur', function() {
        if (confirm_password.value == '') {
            alert('Please enter a confirm password')
        }
        if (confirm_password.value != password.value) {
            alert('Re-enter password incorrect')
        }
    })

    
}
validateLogin()


// /*===== POST  =====*/

function getPosts(callback) {
    fetch('/posts', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
        },
    })
        .then(function (response) {
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
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

//DOM posts
function render(posts) {
    var listPosts = document.querySelector("#status")
    var htmls = posts.post.slice(0).reverse().map(function (e) {
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
                
                
    
                <div class="p-2">
                    <p class="text-justify content">${e.content}</p>
                    <div class="audio-${e._id}">
                    </div>

                    <hr>
    
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row icons d-flex align-items-center"><i
                                class="fa fa-thumbs-up mx-3"></i> </div>
                        <div class="d-flex flex-row muted-color"> <span>2 comments</span> <span
                                class="ml-2">Share</span> </div>
                    </div>
    
                    <hr>
    
                    <div class="comments">
                        <div id="comments-${e._id}"></div>
                    
    
                        <div class="comment-input"> <input type="text" class="form-control"
                                placeholder="Write a comment..." id="comment-input" onclick="handleCreateComment(\'${e._id}\')">
                            <div class="fonts"> <i class="fa fa-camera"></i> </div>
                        </div>
                    </div>
                </div>
            </div>`
    })
    listPosts.innerHTML = htmls.join("");

    for (var i = 0; i < posts.post.length; i++) {
        var listComments = document.querySelector("#comments-"+posts.post[i]._id)
        var xyz = posts.post[i].comment.map(function (e) {
            return `
            <div class="d-flex flex-row mb-2"> <img src="https://i.imgur.com/9AZ2QX1.jpg" width="40"
                        class="rounded-image">
                <div class="d-flex flex-column ml-2"> <a class="name text-dark" href="/personal/${e.user._id}">${e.user.username}</a> <small
                        class="comment-text">${e.content}</small>
                    <div class="d-flex flex-row align-items-center comment-func">
                        <small>Like</small>
                        <small>Reply</small> <small>18 mins</small>
                    </div>
                </div>
            </div>
            `
        })
        listComments.innerHTML = xyz.join("")
    }

    for (var i = 0; i < posts.post.length; i++) {
        var audio = document.querySelector(".audio-"+posts.post[i]._id);
        if (posts.post[i].youtubeUrl) {
            audio.innerHTML += `
            <iframe width="100%" height="315" src="${posts.post[i].youtubeUrl}" id="youtubeUrlele" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
        }
        if (posts.post[i].pictureUrl) {
            audio.innerHTML += `
            <img src="${posts.post[i].pictureUrl}" class="img-fluid" width="100%" id="pictureUrlele">
            `
        }
    }
}

//Create post
function createPosts(data, callback) {
    var Options = {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/posts/create', Options)
        .then(function (response) {
            response.json();//promise resolves dạng JSON
        })
        .then(callback)
}

function handlecreate() {
    var createBtn = document.querySelector('#post-btn')

    if (createBtn) {
        createBtn.onclick = function () {
            var content = document.querySelector('#content').value;
            
            //New
            var pictureUrl = document.querySelector('#pictureUrl').value;
            var youtubeUrl = document.querySelector('#youtubeUrl').value;

            if (youtubeUrl) {
                var a = youtubeUrl.slice(0 ,24) //https://www.youtube.com/
                var b = youtubeUrl.slice(32, 43) //code
                youtubeUrl = a + 'embed/' + b
            }

            var formdata = {
                content: content,
                //New
                pictureUrl: pictureUrl,
                youtubeUrl: youtubeUrl
            }
            if (content != '') {
                createPosts(formdata, function () {
                    getPosts(render)
                });
            } else {
                alert('Vui long nhap noi dung bai viet')
            }
            $("#content").val('');
            //New
            $("#youtubeUrl").val('');
            $("#pictureUrl").val('');
        }
    }
}

//Create comment
function createComment(id, data, callback) {
    var Options = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/comment/create/' + id, Options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
}

function handleCreateComment(id) {
    var postItem = document.querySelector(".post-" + id);
    var commentInput = postItem.querySelector('#comment-input');
    if (commentInput) {
        commentInput.addEventListener('keypress' ,function (e) {
            if (e.key == 'Enter') {
                var commentContent = {
                    content: commentInput.value
                }
                if (commentContent.content != '') {
                    createComment(id, commentContent, function () {
                        start()
                    });
                }else {
                    alert('Vui long nhap noi dung comment')
                }
                $("comment-input").val('');
            }
        })
    }
}

//Edit post
function change(id, data, callback) {
    var Options = {
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
            if (response.status == 401 && response.statusText == "Unauthorized") {
                throw new Error("Ban khong the sua bai viet cua nguoi khac")
            } else if (response.status == 400 && response.statusText == "Bad Request") {
                throw new Error("Vui long nhap noi dung muon thay doi")
            }
        })
        .then(callback)
        .catch(function (err) {
            alert(err)
        })
}

function handlechange(id) {
    var postItem = document.querySelector(".post-" + id);
    var getContent = postItem.querySelector(".content").innerText;

    var contentChange = document.querySelector("#contentChange")
    contentChange.value = getContent;

    var btnUpdate = document.querySelector("#change-btn")
    btnUpdate.onclick = function () {
        var formData = {
            content: contentChange.value,
        };
        contentChange.value = ''
        change(id, formData, function () {
            start(); //thay cho dong tren
        })
    }
}

//Delete Post
function deletePost(id) {
    var Options = {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
    }
    fetch('/posts' + '/' + id, Options)// giống postman course/id để xóa 
        .then(function (response) {
            response.json();//promise resolves dạng JSON
            if (response.status == 401 && response.statusText == "Unauthorized") {
                throw new Error("Unauthorized")
            }
        })
        .then(function () {
            var postItem = document.querySelector('.post-' + id)
            if (postItem) {
                postItem.remove();
            }
        })
        .catch(function (err) {
            alert('Ban khong the xoa bai viet cua nguoi khac')
        })
}

//Change student info
function changeInfo(data, callback) {
    var Options = {
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/change', Options)
        .then(function (response) {
            response.json();//promise resolves dạng JSON
        })
        .then(callback)
}

function handleChangeInfo() {
    var changeBtn = document.querySelector('#change-btn')
    var formChangeInfo = document.querySelector('#formChangeInfo')
    if (changeBtn) {
        changeBtn.onclick = function () {
            var newUsername = formChangeInfo.querySelector('#username').value;
            var newClassID = formChangeInfo.querySelector('#classID').value;
            var newKhoa = formChangeInfo.querySelector('#khoa').value;

            var formdata = {
                username: newUsername,
                classID: newClassID,
                khoa: newKhoa,
            }
            changeInfo(formdata, function() {
                alert('Thay doi thanh cong')
            })
            $("#username").val('');
            $("#classID").val('');
            $("#khoa").val('');
        }
    }
}
