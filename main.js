const arrString = window.localStorage.getItem('arry');
const arr =  JSON.parse(arrString);
console.log(arr);
const map = arr || [
    {name:"百",link:"https://baidu.com",desc:"百度"},
    {name:"G",link:"https://google.com",desc:"谷歌"},
    {name:"M",link:"https://developer.mozilla.org/zh-CN/",desc:"MDN"},
    {name:"R",link:"https://react.docschina.org/",desc:"React"},
    {name:"C",link:"https://css-tricks.com/",desc:"CSS-TRICKS"},
    {name:"H",link:"https://github.com/dashingli?tab=repositories",desc:"GitHub"},
    {name:"I",link:"https://caniuse.com/",desc:"Can I Use"},
    {name:"网道",link:"https://wangdoc.com/",desc:"网道"},
    {name:"Code",link:"https://codepen.io/trending?cursor=ZD0wJm89MCZwPTE=",desc:"CodePen"},
]
//搜索功能
const searchInput = document.querySelector('.search-input');
searchInput.onkeydown = (e) =>{
    if(e.code === 'Enter'){
        const searchValue = searchInput.value;
        if(searchValue === ""){
            alert('输入为空');
        }else{
            window.open(`https://www.google.com.hk/search?q=${searchValue}`,'_blank');
            searchInput.value = "";
        }
    }
}
const navAdd = document.querySelector('.add');
navAdd.addEventListener('click',() =>{
    const link = window.prompt("请输入网址(请以https://或http://开头)");
    if(link === ""){
        alert("输入网址为空,请重新添加");
        return;
    }
    const desc = window.prompt("请输入名称");
    if(desc === ""){
        alert("输入名称为空,请重新添加");
        return
    }
    const name = desc[0];
    const mapObj = {
        name:name,link:link,desc:desc
    }
    map.push(mapObj);
    console.log(map);

    render();

})
//渲染
const render = () => {
    //先清空
    const nav = document.querySelectorAll('.nav')
    if(nav !== null){
        for (let i = 0; i <nav.length ; i++) {
            nav[i].remove();
        }
    }
    for (let i = 0; i < map.length; i++) {
        const mapObj = map[i];
        const name = mapObj.name;
        const link = mapObj.link;
        const desc = mapObj.desc;
        const text = `<div class="nav">
                    <div class="nav-logo">
                       ${name}
                    </div>
                    <a class="nav-name" href="${link}" target="_blank">${desc}</a>
                </div>`
        navAdd.insertAdjacentHTML('beforebegin', text);
    }
}
render();
window.onbeforeunload = ()=>{
    const string = JSON.stringify(map);
    window.localStorage.setItem('arry',string);
}