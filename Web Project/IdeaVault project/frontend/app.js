document.addEventListener("DOMContentLoaded", () => {
  const ideaList = document.getElementById("ideaList");
  const form = document.getElementById("ideaForm");
  const categoryTags = document.getElementById("categoryTags");

  let currentCategory = "";

  const fetchIdeas = async () => {
    const res = await fetch(
      `http://3.27.60.33:5000/api/ideas?category=${currentCategory}`
    );
    const ideas = await res.json();

    const categories = new Set();

    ideaList.innerHTML = "";
    if (ideas.length === 0) {
      ideaList.innerHTML = `
        <li class="list-group-item text-center text-muted">
          No ideas available for this category.
        </li>`;
      return;
    }

    ideas.forEach((idea) => {
      idea.categories.forEach((cat) => categories.add(cat));

      const categoriesHtml = idea.categories
        .map((cat) => `<span class="badge bg-secondary me-1">${cat}</span>`)
        .join("");

      const li = document.createElement("li");
      li.className = "list-group-item idea-item";
      li.innerHTML = `
        <div>
          <span class="idea-title">${idea.title}</span>
          <div class="idea-description">${idea.description}</div>
          <div>${categoriesHtml}</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteIdea('${idea._id}')">Delete</button>
      `;
      ideaList.appendChild(li);
    });

    renderCategoryTags(categories);
  };

  const renderCategoryTags = (categories) => {
    categoryTags.innerHTML = `
      <span class="badge bg-secondary ${!currentCategory ? "active" : ""}" 
            onclick="filterCategory('')">All</span>
    `;
    categories.forEach((category) => {
      categoryTags.innerHTML += `
        <span class="badge bg-info ${
          currentCategory === category ? "active" : ""
        }" 
              onclick="filterCategory('${category}')">
          ${category}
        </span>
      `;
    });
  };

  window.filterCategory = (category) => {
    currentCategory = category;
    fetchIdeas();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const categoriesInput = document.getElementById("categories").value.trim();

    const categories = categoriesInput
      ? categoriesInput.split(",").map((cat) => cat.trim())
      : ["Uncategorized"];

    await fetch("http://3.27.60.33:5000/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, categories }),
    });

    form.reset();
    fetchIdeas();
  });

  window.deleteIdea = async (id) => {
    await fetch(`http://3.27.60.33:5000/api/ideas/${id}`, {
      method: "DELETE",
    });
    fetchIdeas();
  };

  fetchIdeas();
});
