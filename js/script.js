// load data dymamic categories btns
const loadCates = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCates(data.categories))
    .catch((error) => console.log(error));
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// display cate
const displayCates = (data) => {
  const categoryContainer = document.getElementById("category-btn");
  data.forEach((categorys) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="btn px-5 py-2 font-bold text-xl">${categorys.category}</button>
    `;
    categoryContainer.append(div);
  });
};

// video load & display

const loadVideos = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await res.json();
  displayVideos(data.videos);
};

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
// display video
const displayVideos = (data) => {
  const videoContainer = document.getElementById("videos_container");
  console.log(data);
  data.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
     <figure class="h-[220px]">
    <img
      src=${video.thumbnail}    
      alt="Shoes" class="h-full w-full object-cover"/>
  </figure>
  <div class="px-0 py-3 flex gap-5 items-center">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    }/>
    </div>
    <div>
    <h2 class="font-bold text-xl">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`
        : ""
    }
    </div>
    <p class="text-sm text-gray-400">${video.others.views}</p>
    </div>
  </div>
    `;
    videoContainer.append(div);
  });
};

loadCates();
loadVideos();
