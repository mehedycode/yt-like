

// load data dymamic categories btns
const loadCate = () => {

  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => displayCate(data.categories))
}


// {
//     "category_id": "1001",
//     "category": "Music"
// }

// display cate
const displayCate = (data) => {

 const categoryContainer =  document.getElementById('category-btn')
data.forEach(categorys => {
 
  const div = document.createElement('div')
  div.innerHTML = `
  <button class="btn px-5 py-2 font-bold text-xl">${categorys.category}</button>
  
  `
  categoryContainer.append(div)
})

}



loadCate()