const arrString = window.localStorage.getItem('arry');
const arr =  JSON.parse(arrString);
const map = arr || [
    {name:"百",link:"https://baidu.com",desc:"百度",id:1},
    {name:"G",link:"https://google.com",desc:"谷歌",id:2},
    {name:"M",link:"https://developer.mozilla.org/zh-CN/",desc:"MDN",id:3},
    {name:"R",link:"https://react.docschina.org/",desc:"React",id:4},
    {name:"C",link:"https://css-tricks.com/",desc:"CSS-TRICKS",id:5},
    {name:"H",link:"https://github.com/dashingli?tab=repositories",desc:"GitHub",id:6},
    {name:"I",link:"https://caniuse.com/",desc:"Can I Use",id:7},
    {name:"网道",link:"https://wangdoc.com/",desc:"网道",id:8},
    {name:"Code",link:"https://codepen.io/trending?cursor=ZD0wJm89MCZwPTE=",desc:"CodePen",id:9},
]
let id = 9;
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
//添加功能
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
        name:name,link:link,desc:desc,id:id+1
    }
    map.push(mapObj);
    console.log(map);

    render();

})
//监听nav
document.addEventListener('click',(e)=>{
    console.dir(e.target);
    if(e.target.classList[1] === "close" || e.target.nodeName === 'use'){
        e.preventDefault();
        let id;
        if(e.target.nodeName === 'use'){
            id = parseInt(e.target.farthestViewportElement.id);
            console.log("id为"+id);
        }else{
            id = parseInt(e.target.id);
            console.log("id为"+id);
        }
        //遍历arr数组
        for(let i = 0;i<arr.length;i++){
            if(arr[i]['id'] === id){
                arr.splice(i,1);
                const stringArr = JSON.stringify(arr);
                window.localStorage.setItem('arry',stringArr);
            }
        }
        render();
        console.log("阻止成功");

    }
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
        const id = mapObj.id;
        console.log("id:"+id);
        const text = `<a class="nav" href="${link}" target="_blank" >
                     <svg class="icon close" aria-hidden="true" id=${id} >
                    <use xlink:href="#icon-closefill"></use>
                     </svg>
                    <div class="nav-logo">
                       ${name}
                    </div>
                    <div class="nav-name">${desc}</div>
                </a>`
        navAdd.insertAdjacentHTML('beforebegin', text);
    }
}
render();
// 退出页面后将收藏页面写入localstorage
window.onbeforeunload = ()=>{
    const string = JSON.stringify(map);
    window.localStorage.setItem('arry',string);
}
