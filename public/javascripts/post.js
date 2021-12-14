$(document).ready(function () {
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
                // console.log(data.post)
                for (let i = 0; i < data.post.length; i++) {
                    // console.log('hello')
                    var temp = document.getElementsByTagName("template")[0];
                    var clone = temp.content.cloneNode(true);
                    var nameEl = clone.querySelector(".username");
                    nameEl.innerHTML = data.post[i].user.username //database username
                    var statusEl = clone.querySelector(".content");
                    statusEl.innerHTML = data.post[i].content; //database content

                    document.getElementById('status').appendChild(clone);
                }
            })
        })

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
                        // console.log(data)
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

});

