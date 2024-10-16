// load data dymamic categories btns
const loadCates = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCates(data.categories))
    .catch((error) => console.log(error));
};


// display cate
const displayCates = (data) => {
  const categoryContainer = document.getElementById("category-btn");
  data.forEach((categorys) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-${categorys.category_id}" onclick="loadCateVideos(${categorys.category_id})" class=" border border-gray-200 md:px-5 px-3 md:py-2 py-1 font-bold text-sm md:text-xl category-btn">${categorys.category}</button>
    `;
    categoryContainer.append(div);
  });
};

// btn click categories ways video show
const loadCateVideos = (id) => {

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      resetActive()
      const btn = document.getElementById(`btn-${id}`);
      btn.classList.add('active')
      
      displayVideos(data.category)
    })

  
}

// reset active btns 
const resetActive = () => {

  const cateBtns = document.getElementsByClassName("category-btn");
  for (const btn of cateBtns) {
    btn.classList.remove('active')

  }

}

// video load & display

const loadVideos = async (searchText = '') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await res.json();
  displayVideos(data.videos);
};

// time convart
function timeConvart(times) {
  

  const hours = parseInt(times / 3600)
  const remainingSec = times % 3600
  const minute = parseInt(remainingSec / 60)
  const sec =   remainingSec % 60

  return `${hours} Hours ${minute} Minute ${sec} Sec Ago`
}

function timeConvart2(times) {
  const hours = parseInt(times / 3600);
  const remainingSec = times % 3600;
  const minute = parseInt(remainingSec / 60);
  const sec = remainingSec % 60;

  return `${hours}:${minute}:${sec}`;
}

// LOAD MODAL
const loadDetails = async (videoId) => {
    
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url)
  const data = await res.json()
  displayModal(data.video)
  
}
  
displayModal = (data) => {
 const modalContent = document.getElementById('modal-container')

   modalContent.innerHTML = `
  <img src= ${data.thumbnail}/>
  <h4 class="font-bold text-xl">${data.title}</h4>
  <P class="text-gray-400 font-semibold text-sm">${data.description}</P>
  
  `;

  // way 1
//  document.getElementById("showModal").click(); 

  // way 2
  document.getElementById("my_modal_5").showModal();

 
}


// display video
const displayVideos = (data) => {
  const videoContainer = document.getElementById("videos_container");
  videoContainer.innerHTML = ''

  if (data.length == 0) {
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML = `
   <div class="h-[400px] flex justify-center items-center gap-5 flex-col">
    <img src="assets/Icon.png"/>
    <p class="font-bold text-sm md:text-xl">Oops!! Sorry, There is no content here</p>
   </div>

    `;

  }
  else {
    videoContainer.classList.add('grid')
  }

  data.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
     <figure class="h-[220px] relative">
    <img
      src=${video.thumbnail}    
      alt="Shoes" class="h-full w-full object-cover"/>

        ${
          video.others.posted_date.length === 0
            ? ""
            : `   <span class="absolute right-2 bottom-2 bg-black text-white font-bold text-xs p-1 rounded-md">
            ${timeConvart2(video.others.posted_date)}
          </span>`
        }
      
  </figure>
  <div class="px-0 py-3 gap-3 grid grid-cols-[10%_80%] ">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    }/>
    </div>
    <div>
    <h2 class="font-bold text-xl">${video.title}</h2>
    <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
        : ""
    }
    </div>
    <div>
    <button onclick="loadDetails('${
      video.video_id
    }')" class="bg-[#FF1F3D] text-sm px-3 py-0 rounded-md text-white">Details</button>
    </div>
    </div>

    <div class="flex items-center gap-3">
    <p class="text-sm text-gray-400">${video.others.views}</p>

    
    ${
      video.others.posted_date.length === 0
        ? ""
        : `<span class="relative bottom-1">.</span>`
    }
      
      ${
        video.others.posted_date.length === 0
          ? ""
          : `   <span class=" text-gray-400 font-bold text-xs">
            ${timeConvart(video.others.posted_date)}
          </span>`
      }
      
    </div>
    
    </div>
  </div>
    `;
    videoContainer.append(div);
  });
};
document.getElementById("input").addEventListener('keyup', (event)=> {
 
  loadVideos(event.target.value)

})

loadCates();
loadVideos();
