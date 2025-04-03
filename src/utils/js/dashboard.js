const search_input = document.getElementById("search-box-input");
const search_img = document.getElementById("search-box-img");



search_img.addEventListener("click",()=>{
    alert(search_input.value)
    search_input.value = "";
})

handleCardClick((e)=>{
    alert("Hi")
})