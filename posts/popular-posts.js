document.addEventListener("DOMContentLoaded", function () {
    const popularPosts = [
        {title: "Portfolio Website: 12 for 12 January Project", link: "../projects/website-project.html" },
        {title: "The Gavel: Behind the Scenes of Making a...", link: "../index.html"},
        {title: "Why 12 for 12: Explaining my 2025 project(s)", link: "../blog/why-12-for-12.html"}
    ];

    const sidebar = document.getElementById("popular-posts");
    if (sidebar) {
        let content = '<h3>Popular Posts</h3>'
        popularPosts.forEach(post => {
            content += `<div class="fakeimg" style="width: 90%; background-color: black; border-radius: 25px;">
                            <a href="${post.link}">${post.title}</a>
                        </div><br>`;
        });
        sidebar.innerHTML = content;
    }


});