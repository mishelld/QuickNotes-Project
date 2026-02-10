import "./CategoryButtons.css";

function CategoryButtons({ selectedCategory, setSelectedCategory }) {
  const categories = [
    { label: "All", value: null },
    { label: "Work", value: "work" },
    { label: "Personal", value: "personal" },
  ];
  return (
    <>
      <div className="category-btns">
        {categories.map((c) => (
          <button key={c.label} onClick={() => setSelectedCategory(c.value)}>
            {c.label}
          </button>
        ))}
      </div>
    </>
  );
}
export default CategoryButtons;
