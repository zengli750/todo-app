// 1.dom
const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')
// 2.数据容器
let todos=[]
// 3.本地存储key
const STORAGE_KEY='todo-day1'
//4.保存到localstorage
function saveTodos(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
}
//5.渲染数据;把todos数组变成<li>
function renderTodos(){
    list.innerHTML="";
    todos.forEach(text => {
    const li = document.createElement('li'); // 创建一个列表项元素
    li.textContent = text; // 给列表项设置文本内容（值为当前遍历的元素text）
    list.appendChild(li); // 将列表项添加到列表容器（list，通常是<ul>或<ol>）
});
}
//6.监听form提交
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const text=input.value.trim()
    if(!text) return
    todos.push(text)
    input.value=''
    saveTodos()
    renderTodos()
})
//7首次渲染
renderTodos();


