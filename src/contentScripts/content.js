  var css= `body, .post-publish{
    background: #1d1d1d !important;
    color: #828282;
    }
    .main-navbar {
        background: #1d1d1d !important;
    }
    .main-menu__item .active,
    .main-menu__item a:hover {
        color: #9dbbff !important;
    }
    a.accented-link, a.link:hover {
        color: #5488c7 !important;
    }
    input, 
    textarea,
    code,
    pre {
        background: #2d2d2d !important;
        border: none !important;
        color: #828282 !important; 
    
    }
    .question-item {
        border-bottom: 1px solid #333333 !important;
    }
    
    .el-tag {
        background: #2f2e2e !important;
        border: 0px !important;
    }
    .q-title a,
    .sidebar__user__row .d-block, 
    .link{
        color: #a5a5a5 !important;
    }
    .post-feed-item:not(:last-child) {
        border-bottom: 1px solid #333333 !important;
    }
    h3 {
        color: #a3dcff !important;
    }
    
    .post-content .article-content__title, 
    .post-content h1, 
    .post-content h2, 
    h1.user-name,
    .title,
    h4
    {
        color: #b3b2b2 !important;
    
    }
    p, li {
        color: #9a9a9a !important;
    }
    
    .post-content p code {
        background: #2f2e2e !important;
    }
    
    .post-actions__clip {
        background: #1d1d1d !important;
    }
    .footer div.post-recommendations, 
    .footer div.bg-light {
        background: #1d1d1d !important;
        color: #9a9a9a !important;
    }
    .section-title h4 , .section-title-line {
        color: #b3b2b2 !important;
    }
    .comment p, .comment .comment-user{
        color: #9a9a9a !important;
    }
    .editor-toolbar {
        background: #a0a0a0;
    }
    .CodeMirror {
        background: #7b7b7b !important;
    }
    
    .post-publish input {
        background: black !important;
        border: none !important;
    }
    
    blockquote {
        background: #2d2d2d !important;
    }
    
    .footer {
        background: #1d1d1d !important;
    }
    
    .comment-thread.root,
    .card, 
    .root-comment-form{
        background: #353535 !important;
        border: none !important;
    }
    .v-float-menu.el-menu {
      background: #151515 !important;
    }
    .v-float-menu .el-menu-item.is-active {
      background: #353535 !important;
    }
    `;
if (localStorage.getItem('viblo_dark_mode') == 'yes') {
  console.log(localStorage.getItem('viblo_dark_mode') )
  addStyle(css);
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg) {
    if (request.msg.action === "print_in_console") {      
    if (request.value === 'true') {

      addStyle(css);
      localStorage.setItem('viblo_dark_mode', 'yes');

    } else if (request.value === 'false' ) {
      addStyle('');

      var darkModeStyle = document.getElementsByTagName("style");
      for (i = 0; i < darkModeStyle.length; i++) {
        if(darkModeStyle[i]) {
          darkModeStyle[i].remove();
        }
      }
      localStorage.setItem('viblo_dark_mode', 'no');

    }
      var x = document.getElementsByClassName("post-recommendations");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "rgb(29 29 29) !important";
        x[i].classList.remove("bg-light");
      }
    } else if (request.msg.action === "change_body_color") {

      document.body.style.background = request.msg.value;
    }
  }
});

function addStyle(styles) { 
  var css = document.createElement('style'); 
  css.type = 'text/css'; 
  css.setAttribute("class", "darkMode");
  if (css.styleSheet)  
      css.styleSheet.cssText = styles; 
  else  
      css.appendChild(document.createTextNode(styles)); 
    
  document.getElementsByTagName("head")[0].appendChild(css); 
} 
