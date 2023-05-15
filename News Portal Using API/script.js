function dynamicNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const logo = document.querySelector('#logo');
    const links = document.querySelector('#link');
    const linksHeight = links.offsetHeight;
    const windowHeight = window.innerHeight;
  
    // Add the "sticky" class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNavbar() {
      if (window.pageYOffset >= navbarHeight) {
        navbar.classList.add('sticky');
        logo.style.height = `${linksHeight}px`;
      } else {
        navbar.classList.remove('sticky');
        logo.style.height = 'auto';
      }
    }
  
    window.addEventListener('scroll', stickyNavbar);
    window.addEventListener('resize', stickyNavbar);
  
    // Calculate the height of the viewport and set the min-height of the body
    document.body.style.minHeight = `${windowHeight}px`;
  }
  
  dynamicNavbar();
  
var spin = document.getElementById('spinner');
// // Fetching News Categories From API
async function fetchcategory() {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const cat = await res.json();
    showcategory(cat.data.news_category)
}
// // Displaying  All Categories After Fetch
function showcategory(category) {
    const categorydiv = document.querySelector('#categories');
    // console.log(categorydiv)
    category.forEach(element => {
        categorydiv.innerHTML += `
    <div class="col-auto gx-5">
        <p  class="category" onclick="fetchnews('${element.category_id}','${element.category_name}')">${element.category_name}<p/>
    </div>`;
    });
}

// // Fetching Newses on specific Category from API
async function fetchnews(categoryid, category_name) {
    spin.style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryid}`;
    const res = await fetch(url);
    const news = await res.json();
    if (news.status) {
        shownews(news.data, category_name);
    }
    else {
        spin.style.display = 'none';
        document.querySelector('#card').innerHTML = '<h1 style="text-align: center;"> No News At the moment </h1>'
        document.getElementById('alert').innerHTML = '';
    }
}
// // Displaying Newses on selected catergory
function shownews(newses, name) {
    spin.style.display = 'none';
    const carddiv = document.querySelector('#card');
    document.getElementById('alert').innerHTML = `<h4><span class="text-primary fs-2">${newses.length}</span> Newses in the category "${name}"</h4>`;
    carddiv.innerHTML = '';

    // sortNewsByDefault(newses);
    newses.forEach(element => {
        // getting star on the rating value from API
        let st = '';
        const val = Math.round(element.rating.number)
        for (i = 0; i < 5; i++) {
            if (i < val)
                st += `<i class="fas fa-star text-warning " id="1"></i>`
            else
                st += `<i class="fas fa-star" id="1"></i>`
        }
        carddiv.innerHTML += `
        <div class="row p-2 m-4 shadow rounded-4">
                    <div class="col-lg-3  d-flex flex-column align-content-center justify-content-center">
                        <img src="${element.thumbnail_url != null && element.thumbnail_url != "" ? element.thumbnail_url : "./alterimg.jpg"}" class="img-fluid rounded-start w-100" alt="...">
                    </div>
                    <div class="col-lg-9"  >
                        <div class="card w-100 border-0">
                            <div class="card-body">
                                <h4 class="card-title">${element.title} 
                                <span class="badge text-bg-danger">${element.others_info.is_todays_pick ? "Todays Pick" : "Not Todays Pick"}</span> 
                                <span class="badge text-bg-info">${element.others_info.is_trending ? "Trending" : "Not Trending"}</span></h4>
                                <p class="card-text">Tucker Carlson has rarely met a dictator's ass he didn't want to kiss, 
                                and Vladimir Putin is at the very top of that puckering up list. </p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small>
                                <div class="d-flex w-100 mt-5">
                                    <div class="author w-25 d-flex">
                                        <div class="w-25">
                                        <img src="${element.author.img != null && element.author.img != "" ? element.author.img : "./alterimg.jpg"}"
                                            alt="" class="img-fluid rounded-circle w-100">
                                        </div>
                                        <div class="d-flex flex-column mx-1 w-75">
                                            <h5 class="my-0 fs-5 fw-light">${element.author.name != null && element.author.name != "" ? element.author.name : "Unknown"}</h5>
                                            <h6 class="my-0 fw-lighter">>${element.author.published_date != null && element.author.published_date != "" ? element.author.published_date : "2022-08-30 15:00:04"}</h6>
                                        </div>
                                    </div>
                                    <div class="view w-25 d-flex align-content-center justify-content-center">
                                        <div class="out">
                                            <div class="in">
                                            </div>
                                        </div>
                                        <p>${element.total_view != null && element.total_view != "" ? element.total_view : "No view"}</p>
                                    </div>
                                    <div class="rating w-25">
                                        ${st}
                                    </div>
                                    <div class="detail w-25 h-25 align-content-center justify-content-end d-flex">
                                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop" onclick="modalbody('${element._id}')">-></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    });
}

// // Fetching Single News On ID from API
async function modalbody(id) {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    console.log(details.data)
    printinmodal(details.data[0])
}
// // Displaying News in a modal body
function printInModal(data) {
    const modalBody = document.querySelector('#modalBody');
  
    // Use object destructuring to extract the data
    const {
      thumbnail_url,
      title,
      others_info: { is_todays_pick, is_trending },
      details,
      author: { img, name, published_date },
      total_view
    } = data;
  
    modalBody.innerHTML = `
      <div class="row shadow d-flex flex-column align-content-center justify-content-center">
        <div class="col-auto w-75 d-flex flex-column align-content-center justify-content-center">
          <img src="${thumbnail_url || './alterimg.jpg'}" class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-lg-9">
          <div class="card w-100 border-0">
            <div class="card-body">
              <h4 class="card-title">${title}
                <span class="badge text-bg-danger">${is_todays_pick ? "Todays Pick" : "Not Todays Pick"}</span> 
                <span class="badge text-bg-info">${is_trending ? "Trending" : "Not Trending"}</span>
              </h4>
              <p class="card-text">${details}</p>
              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
              <div class="d-flex w-100 mt-5 align-content-center justify-content-between">
                <div class="author w-50">
                  <div class="w-25">
                    <img src="${img || './alterimg.jpg'}" alt="" class="img-fluid rounded-circle w-100">
                  </div>
                  <div class="d-flex flex-column mx-1 w-75">
                    <h5 class="my-0 fs-5 fw-light">${name || 'Unknown'}</h5>
                    <h6 class="my-0 fw-lighter">${published_date || '2022-08-30 15:00:04'}</h6>
                  </div>
                </div>
                <div class="view w-50 d-flex align-content-center justify-content-center">
                  <div class="out">
                    <div class="in"></div>
                  </div>
                  <p>${total_view || 'No view'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  

fetchcategory(); 
