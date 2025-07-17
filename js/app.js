/*
 * 待办事项应用核心逻辑
 * 功能：添加待办、标记完成状态、本地存储持久化
 */

// DOM元素引用
// 表单元素 - 用户输入新待办事项的表单
const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input') // 输入框元素 - 用户输入待办事项文本
const list = document.getElementById('todo-list') // 列表容器 - 展示所有待办事项
// 数据存储
// 本地存储键名 - 用于标识待办事项数据在localStorage中的存储位置
const STORAGE_KEY='todo-day2'
// 待办事项数组 - 存储所有待办项对象
// 每个对象结构: { text: string, done: boolean }
// 初始化时从localStorage加载数据，若无则初始化为空数组
let todos=JSON.parse(localStorage.getItem(STORAGE_KEY))||[];
// 3.本地存储key
// const STORAGE_KEY='todo-day1'
/**
 * 将待办事项数组保存到localStorage
 * 功能：序列化todos数组并存储到本地
 */
function saveTodos(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
}
/**
 * 渲染待办事项列表
 * 功能：根据todos数组动态生成DOM元素，展示所有待办项
 * 包含：根据done状态设置样式和复选框状态
 */
function renderTodos(){
    list.innerHTML='';
    todos.forEach((item,index)=> {
    const li = document.createElement('li'); // 创建一个列表项元素
    li.className =item.done ?'done':'';
    li.innerHTML=`
    <input type="checkbox" data-index="${index}" ${item.done ? 'checked':''}>
    <span>${item.text}</span>
    `;
    list.appendChild(li); // 将列表项添加到列表容器（list，通常是<ul>或<ol>）
});
}
/**
 * 处理表单提交事件
 * 功能：添加新的待办事项到数组并更新UI
 * 流程：
 * 1. 阻止表单默认提交行为
 * 2. 获取并验证输入框内容
 * 3. 添加新待办项到todos数组
 * 4. 清空输入框
 * 5. 保存数据到本地存储
 * 6. 重新渲染列表
 */
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const text=input.value.trim()
    if(!text) return
    todos.push({text,done:false})
    input.value=''
    saveTodos()
    renderTodos()
})
// renderTodos();

/**
 * 处理待办项状态变更事件
 * 功能：监听复选框变化，更新对应待办项的完成状态
 * 流程：
 * 1. 验证事件源是否为复选框
 * 2. 获取待办项索引
 * 3. 更新对应待办项的done属性
 * 4. 保存数据到本地存储
 * 5. 重新渲染列表
 */
list.addEventListener('change', e=>{
    if (!e.target.matches('input[type=checkbox]'))return;
    const idx=e.target.dataset.index;
    todos[idx].done=e.target.checked;
    saveTodos();
    renderTodos();
})
// 初始化渲染 - 页面加载完成后首次渲染待办事项列表
renderTodos();


