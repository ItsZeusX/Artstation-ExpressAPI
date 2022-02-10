//Express
const express = require("express");
const app = express();

//Local Files
const fetch = require("node-fetch");
const { query } = require("express");

const headers = {
  "as-client-id":
    "4908d3fb6d17c81b4a0ddc30bc73b4150b2171f737dec28a36e50eadef95952c",
  "as-random":
    "f82af8b1ffcb5fde2346da455ba95efcce02f3319d28959ce64ad8bff1669444",
  "as-signature":
    "5d9a9cb1e076514e7c3c473c0208843ccd6ad1c8dc8b3dd437f7af04e9b79a65",
  "as-timestamp": "1643137384",
  authorization:
    "Bearer 07020e5214c9b4b89dcce046c7fe023c72410d2749d21d90c1e7e5a85233eedd",
};

app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.get("/home", Home, (req, res) => {
  res.send(res.data);
});
app.get("/projects/:id", GetProjectById, (req, res) => {
  res.send(res.data);
});
app.get("/artists/:username", GetArtistByUserName, (req, res) => {
  res.send(res.data);
});
app.get("/channels", GetChannels, (req, res) => {
  res.send(res.data);
});
app.get("/channels/:channel_id", GetProjectsByChannel, (req, res) => {
  res.send(res.data);
});
app.get("/magazine/posts", GetMagazinePosts, (req, res) => {
  res.send(res.data);
});
app.get("/prints", GetPrints, (req, res) => {
  res.send(res.data);
});
app.get("/prints/:hash_id", GetPrintById, (req, res) => {
  res.send(res.data);
});
app.get("/jobs", GetJobs, (req, res) => {
  res.send(res.data);
});
app.get("/jobs/:id", GetJobById, (req, res) => {
  res.send(res.data);
});

function Home(req, res, next) {
  dimension = req.query.dimension || "all"; //? Can also be 2d - 3d
  filter = req.query.filter_by || "trending"; //? Can also be community - all
  page = req.query.page || 1;
  limit = req.query.per_page || 10;

  url = `https://www.artstation.com/api/v2/community/explore/mobile/projects.json?dimension=${dimension}&filter_by=${filter}&page=${page}&per_page=${limit}`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetProjectById(req, res, next) {
  id = req.params.id;
  url = `https://www.artstation.com/api/v2/community/projects/${id}.json`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetArtistByUserName(req, res, next) {
  username = req.params.username;

  url = `https://api.artstation.com/v1/artists/${username}?include_default_album=true`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetChannels(req, res, next) {
  url = `https://www.artstation.com/api/v2/community/channels/channels.json`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetProjectsByChannel(req, res, next) {
  channel_id = req.params.channel_id;
  per_page= req.query.per_page || 20;
  page=req.query.page || 1;
  url = `https://www.artstation.com/api/v2/community/channels/mobile/projects.json?sorting=trending&channel_id=${channel_id}&per_page=${per_page}&page=${page}`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetMagazinePosts(req, res, next) {
  url = `https://magazine.artstation.com/wp-json/wp/v2/posts`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetPrints(req, res, next) {
  filter = req.query.filter || "trending";
  page = req.query.page || "1";
  per_page = req.query.per_page || "25";
  url = `https://www.artstation.com/api/v2/prints/printed_products/art_poster.json?sort=${filter}&page=${page}&per_page=${per_page}`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetPrintById(req, res, next) {
  hash_id = req.params.hash_id;
  //? print_type should be one of [\"canvas\", \"art_print\", \"art_poster\", \"hd_metal_print\"]
  url = `https://www.artstation.com/api/v2/prints/printed_products/${hash_id}.json?print_type=art_poster`;
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetJobs(req, res, next) {
  q = req.query.q || "";
  url = `https://api.artstation.com/v1/jobs/search?&q=`
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}
function GetJobById(req, res, next) {
  id = req.params.id;
  url = `https://api.artstation.com/v1/jobs/${id}`
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      res.data = json;
      next();
    })
    .catch((err) => console.log(err));
}

let PORT = process.env.PORT || 80;
app.listen(PORT);
