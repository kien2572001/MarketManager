import Category from "../../models/categoryModel";

const rootCategories = [
  {
    name: "Nông sản sạch",
    slug: "nong-san-sach",
    parent: null,
  },
  {
    name: "Nông sản chế biến",
    slug: "nong-san-che-bien",
    parent: null,
  },
  {
    name: "Thủ công mỹ nghệ",
    slug: "thu-cong-my-nghe",
    parent: null,
  },
  {
    name: "Mặt hàng khác",
    slug: "mat-hang-khac",
    parent: null,
  }
];

const NongSanSach = [
  {
    name: "Sầu riêng",
    slug: "sau-rieng",
    parent: null,
  },
  {
    name: "Cam",
    slug: "cam",
    parent: null,
  },
  {
    name: "Dưa lưới",
    slug: "dua-luoi",
    parent: null,
  },
  {
    name: "Xoài",
    slug: "xoai",
    parent: null,
  },
  {
    name: "Bưởi",
    slug: "buoi",
    parent: null,
  },
  {
    name: "Măng cụt",
    slug: "mang-cut",
    parent: null,
  },
  {
    name: "Dừa",
    slug: "dua",
    parent: null,
  },
  {
    name: "Gạo",
    slug: "gao",
    parent: null,
  },
];


const NongSanCheBien = [
  {
    name: "Socola",
    slug: "socola",
    parent: null,
  },
  {
    name: "Đường thốt nốt",
    slug: "duong-thot-not",
    parent: null,
  },
  {
    name: "Mật hoa dừa",
    slug: "mat-hoa-dua",
    parent: null,
  },
  {
    name: "Tinh dầu",
    slug: "tinh-dau",
    parent: null,
  },
  {
    name: "Trái cây sấy",
    slug: "trai-cay-say",
    parent: null,
  },
  {
    name: "Bánh Pía",
    slug: "banh-pia",
    parent: null,
  },
];


const ThuCongMyNghe = [
  {
    name: "Giỏ xách",
    slug: "gio-xach",
    parent: null,
  },
  {
    name: "Đồ Handmade",
    slug: "do-handmade",
    parent: null,
  },
  {
    name: "Thảm Trang Trí",
    slug: "tham-trang-tri",
    parent: null,
  },
  {
    name: "Sợi",
    slug: "soi",
    parent: null,
  },
  {
    name: "Lụa Lãnh Mỹ A",
    slug: "lua-lanh-my-a",
    parent: null,
  },
];

const MatHangKhac = [
  {
    name: "Lá Chuối Tươi",
    slug: "la-chuoi-tuoi",
    parent: null,
  },
  {
    name: "Phân Hữu Cơ",
    slug: "phan-huu-co",
    parent: null,
  },
  {
    name: "Ống hút hữu cơ",
    slug: "ong-hut-huu-co",
    parent: null,
  },
  {
    name: "Thủy sản",
    slug: "thuy-san",
    parent: null,
  },
];

const insertCategory = async () => {
  try {
    await Category.insertMany(rootCategories);
    //Insert NongSanSach
    let rootCategory = await Category.findOne({ slug: "nong-san-sach" }); 
    let parent = rootCategory._id;
    const categories = NongSanSach.map((category) => ({ ...category, parent }));
    await Category.insertMany(categories);
    //Insert NongSanCheBien
    rootCategory = await Category.findOne({ slug: "nong-san-che-bien" });
    parent = rootCategory._id;
    const categories1 = NongSanCheBien.map((category) => ({ ...category, parent }));
    await Category.insertMany(categories1);
    //Insert ThuCongMyNghe
    rootCategory = await Category.findOne({ slug: "thu-cong-my-nghe" });
    parent = rootCategory._id;
    const categories2 = ThuCongMyNghe.map((category) => ({ ...category, parent }));
    await Category.insertMany(categories2);
    //Insert MatHangKhac
    rootCategory = await Category.findOne({ slug: "mat-hang-khac" });
    parent = rootCategory._id;
    const categories3 = MatHangKhac.map((category) => ({ ...category, parent }));
    await Category.insertMany(categories3);
    console.log("Insert category successfully!");
  } catch (err) {
    console.log(err);
  }
};

export default insertCategory;

