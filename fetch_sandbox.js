const getTextButton = document.getElementById('getText');
const getUsersButton = document.getElementById('getUsers');
const getPostsButton = document.getElementById('getPosts');
const submitButton = document.getElementById('addPost');
let paragraph = document.getElementById('para');

//create our functions
function getText(){
    fetch('sample.txt')
    .then(res => res.text())
    .then((data)=>{
        var output = '';
        output += `
            <div>
                <p>${data}</p>
            </div>
            `;
        paragraph.innerHTML = output;
    });
}

function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(res => res.json())
    .then((data)=>{
        var output = '<h2 class="mb-4">Posts</h2>';
        data.forEach(post => {
            output += `
            <div class="card card-body">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
            `;
        });
        paragraph.innerHTML = output;
    });
}

function getUsers(){
    fetch('users.json')
    .then(res => res.json())
    .then((data) => {
        let output ='<h2 class="mb-4">Users</h2>';
        data.forEach(d => {
            output += `
            <ul class="list-group mb-3">
                <li class="list-group-item">User ID: ${d.id}</li>
                <li class="list-group-item">User Address: ${d.address}</li>
                <li class="list-group-item">Username: ${d.username}</li>
            </ul>
            `
        })
        paragraph.innerHTML = output;
    });
}

function addPost(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain. */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({ title:title, body:body})
    })
    .then(res => res.json())
    .then(data => console.log(data));
}
//event listener 
getTextButton.addEventListener('click', getText);
getPostsButton.addEventListener('click', getPosts);
getUsersButton.addEventListener('click', getUsers);
submitButton.addEventListener('submit', addPost);