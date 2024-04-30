import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex overflow-x-scroll pb-5 scrollbar-hide">
      <div className="mx-5 flex gap-3 lg:mx-auto">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        <div className="min-w-2"></div>
      </div>
    </div>
  );
};

export default CategoryList;
