document.addEventListener("DOMContentLoaded", () => {
  const ideaList = document.getElementById("ideaList");
  const form = document.getElementById("ideaForm");
  const categoryTags = document.getElementById("categoryTags");

  let currentCategory = "";

  // กำหนด URL ของ Backend
  const API_URL = "http://3.27.60.33:5000/api";

  // ฟังก์ชันดึงข้อมูลไอเดีย
  const fetchIdeas = async () => {
    try {
      const res = await fetch(`${API_URL}/ideas?category=${currentCategory}`);
      if (!res.ok) {
        throw new Error(`Error fetching ideas: ${res.status}`);
      }
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
    } catch (error) {
      console.error("Error fetching ideas:", error.message);
      ideaList.innerHTML = `
        <li class="list-group-item text-center text-danger">
          Failed to load ideas. Please try again later.
        </li>`;
    }
  };

  // ฟังก์ชันแสดงหมวดหมู่
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

  // ฟังก์ชันเปลี่ยนหมวดหมู่
  window.filterCategory = (category) => {
    currentCategory = category;
    fetchIdeas();
  };

  // ฟังก์ชันเพิ่มข้อมูลใหม่
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const categoriesInput = document.getElementById("categories").value.trim();

    const categories = categoriesInput
      ? categoriesInput.split(",").map((cat) => cat.trim())
      : ["Uncategorized"];

    try {
      const res = await fetch(`${API_URL}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, categories }),
      });

      if (!res.ok) {
        throw new Error(`Error adding idea: ${res.status}`);
      }

      form.reset();
      fetchIdeas();
    } catch (error) {
      console.error("Error adding idea:", error.message);
      alert("Failed to add idea. Please try again.");
    }
  });

  // ฟังก์ชันลบไอเดีย
  window.deleteIdea = async (id) => {
    try {
      const res = await fetch(`${API_URL}/ideas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error deleting idea: ${res.status}`);
      }

      fetchIdeas();
    } catch (error) {
      console.error("Error deleting idea:", error.message);
      alert("Failed to delete idea. Please try again.");
    }
  };

  fetchIdeas();
});
