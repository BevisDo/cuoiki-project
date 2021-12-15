$(document).ready(function () {
    //Render posts
    fetch('/posts', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie("token"),
        },
    })
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status code: ' + response.status);
                return;
            }

            response.json().then(data => {
                const db = data
                
                // for (let i = 0; i < data.post.length; i++) {
                //     // console.log('hello')
                //     var temp = document.getElementsByTagName("template")[0];
                //     var clone = temp.content.cloneNode(true);
                //     c
                //     nameEl.innerHTML = data.post[i].user.username //database username
                //     var statusEl = clone.querySelector(".content");
                //     statusEl.innerHTML = data.post[i].content; //database content

                //     var deleteBtn = clone.querySelector(".delete-btn")
                //     deleteBtn.value = data.post[i]._id;

                //     document.getElementById('status').appendChild(clone);
                // }
                data.post.map(e=> {
                    var nameEl = e.user.username
                    var statusEl = e.content
                    var btnId = e._id
                    document.getElementById('status').innerHTML += `
                    <div class="card post-`+btnId+`">
                        <div class="d-flex justify-content-between p-2 px-3">
                            <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg"
                                    width="50px" class="rounded-circle">
                                <div class="d-flex flex-column ml-2">
                                    <span class="font-weight-bold username">`+nameEl+`</span>
                                </div>
                            </div>
                            <div class="d-flex flex-row mt-1 ellipsis ml-auto"> 
                                <small class="mr-2">20 mins</small>
                                <div class="dropleft show">
                                    <a class="fa fa-ellipsis-h" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>

                                    <div class="dropdown-menu bg-secondary text-white" aria-labelledby="dropdownMenuLink">
                                        <button id="delete-btn" class="dropdown-item delete-btn" value="`+btnId+`">Xoá bài viết</button>
                                        <button type="button" class=" dropdown-item" data-toggle="modal" data-target="#deletePost" id="test">Sửa bài viết</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <img src="https://i.imgur.com/xhzhaGA.jpg" class="img-fluid"> -->

                        <div class="p-2">
                            <p class="text-justify content">`+statusEl+`</p>

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
                
            })
        })

    //Post bai viet
    document.getElementById("post-btn").onclick = function (e) {
        e.preventDefault();
        let data = {
            content: document.getElementById('content').value
        }
        fetch('/posts/create', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + getCookie("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status !== 200) {
                console.log('Lookes like there was a problem. Status code: ' + response.status);
                return;
            }
            response.json().then(function (data) {
                if (data.success == true) {
                    var temp = document.getElementsByTagName("template")[0];
                    var clone = temp.content.cloneNode(true);
                    var nameEl = clone.querySelector(".username");
                    nameEl.innerHTML = data.username;
                    var statusEl = clone.querySelector(".content");
                    statusEl.innerHTML = document.getElementById('content').value;

                    

                    document.getElementById('status').prepend(clone);
                    document.getElementById('content').value = '';
                }
            })
        })
    }

    $(document).on('click','#delete-btn',function(event){
        event.preventDefault();
        // console.log(document.getElementById('delete-btn').value)
        // fetch('/posts', {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': "Bearer " + getCookie("token"),
        //         'Content-Type': 'application/json'
        //     },
        // })
        fetch('/posts', {
            method: 'DELETE',
            headers: { 
                'Authorization': 'Bearer' + getCookie("token"),  
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            response.json();
        })
        .then(data => {
            console.log(data)
            // var post = document.querySelector('.post'+id)
            // console.log(post)
            // if(post) {
            //     post.remove();
            // }
        })
    });
    

    // function deletePost() {
    //     console.log('delete post')
    //     // fetch('/posts/' + id, {
    //     //     method: 'DELETE',
    //     //     headers: { 
    //     //         'Authorization': 'Bearer' + getCookie("token"),  
    //     //         'Content-Type': 'application/json'
    //     //     }
    //     // })
    //     // .then(function (response) {
    //     //     response.json();
    //     // })
    //     // .then(function () {
    //     //     console.log('hello m')
    //     //     var post = document.querySelector('.post'+id)
    //     //     console.log(post)
    //     //     if(post) {
    //     //         post.remove();
    //     //     }
    //     // })
    // }

})
