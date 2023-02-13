"use strict";
let icon = document.querySelector('.mode');
icon.onclick = function(){
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        icon.innerHTML = 'LIGHT <ion-icon name="sunny"></ion-icon>';
    } else {
        icon.innerHTML = 'DARK <ion-icon name="moon"></ion-icon>';
    }           
};

const table = document.querySelector('.table'),
    infoTable = document.querySelector('.info'),
    searchBtn = document.querySelector('.search-panel button'),
    searchInput = document.querySelector('.search-panel input');

function apiSearch() {
    fetch(`https://api.github.com/users/${searchInput.value}`)
        .then(res => res.json())
        .then(JSON => 
            
            infoTable.innerHTML = `
            <div class="info-top">
                <div class="user-main-info">
                    <div class="user-image">
                        <img src="${JSON.avatar_url === undefined ? 'https://w7.pngwing.com/pngs/972/583/png-transparent-closed-disabled-forbidden-not-available-arrows-elements-outline-icon.png' : JSON.avatar_url}" alt="">
                    </div>
                    <div class="user-main">
                        <h2>${JSON.name === null || JSON.name === undefined ? 'Not Avaible' : JSON.name}</h2>
                        <a href="${JSON.login === undefined ? null : 'https://github.com/'+JSON.login}">${JSON.login === undefined ? 'Not Avaible' : '@'+JSON.login}</a>
                        <p>${JSON.bio === null || JSON.company === undefined ? 'This profile has no bio' : JSON.bio}</p>
                        <p>Joined 25 Jan 2011</p>
                    </div>
                </div>
                <div class="user-last-online">
                    <p>Joined 25 Jan 2011</p>
                    <p>${JSON.bio === null || JSON.company === undefined ? 'This profile has no bio' : JSON.bio}</p>
                </div>
            </div>
            <div class="user-statistics">
                <div class="repos">
                    <p class="title">
                        Repos
                    </p>
                    ${JSON.public_repos === null || JSON.company === undefined ? 0 : JSON.public_repos}
                </div>
                <div class="followers">
                    <p class="title">
                        Followers
                    </p>
                    ${JSON.followers === null || JSON.followers === undefined ? 0 : JSON.followers}
                </div>
                <div class="following">
                    <p class="title">
                        Following
                    </p>
                    ${JSON.following === null || JSON.following === undefined ? 0 : JSON.following}
                </div>
            </div>
            <div class="directions">
                <div class="line line__top">
                    <div class="item">
                        <img src="./icons/location.svg" alt="">
                        <p>${JSON.location === null || JSON.company === undefined ? 'Not Available' : JSON.location}</p>
                    </div>
                    <div class="item">
                        <img src="./icons/url.svg" alt="">
                        <a href="${JSON.blog === undefined || JSON.blog === '' ? null : `https://${JSON.blog}`}">${JSON.blog === undefined || JSON.blog === '' ? 'Not Available' : JSON.blog}</a>
                    </div>
                </div>
                <div class="line line__bottom">
                    <div class="item">
                        <img src="./icons/twitter.svg" alt="">
                        <p>${JSON.twitter_username === undefined || JSON.twitter_username === null ? 'Not Available' : JSON.twitter_username}</p>
                    </div>
                    <div class="item">
                        <img src="./icons/office-building.svg" alt="">
                        <p>${JSON.company === null || JSON.company === undefined ? 'Not Avaible' : JSON.company}</p>
                    </div>
                </div>
            </div>
        `
        );


    searchInput.value = '';
    table.classList.add('active');
    infoTable.classList.add('active');
}

function disabled() {
    searchInput.value = '';
    table.classList.remove('active');
    infoTable.classList.remove('active');
}

searchBtn.addEventListener('click', apiSearch);

window.addEventListener('keydown',(e) => {
    if (e.code === 'Enter') {
        apiSearch();
    } else if (e.code === 'Escape') {
        disabled();
    }
});

let preloader = document.querySelector('.loader_bg');

window.addEventListener('load', function(){
    setTimeout(function(){
        preloader.style.display = 'none';
    }, 1000);
});