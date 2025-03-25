# Recipe Sharing and Meal Prep Planner
# برنامه اشتراک‌گذاری دستور پخت و برنامه‌ریزی وعده‌های غذایی

[English](#english) | [فارسی](#فارسی)

## English

### Overview
A full-stack web application for sharing recipes and planning meals. This platform allows users to create, share, and discover recipes while also helping them plan their weekly meals efficiently.

### Features
- 🔐 **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - User profile management
  - Dietary preferences tracking

- 📝 **Recipe Management**
  - Create, read, update, and delete recipes
  - Image upload support
  - Search and filter recipes
  - Like and comment functionality
  - Dietary tags and difficulty levels

- 🗓️ **Meal Planning**
  - Weekly meal plan creation
  - Shopping list generation
  - Calorie tracking
  - Budget management
  - Shopping list item status tracking

- 🔍 **Advanced Features**
  - Full-text search
  - Filtering by dietary preferences
  - Recipe recommendations
  - Social features (likes, comments)
  - Image upload support

### Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Upload**: Multer
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Express-validator
- **Caching**: Redis
- **Logging**: Winston

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Redis (for caching)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-sharing-app.git
cd recipe-sharing-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
```

4. Start the server:
```bash
npm start
```

### API Documentation
Access the API documentation at `http://localhost:3000/api-docs`

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## فارسی

### معرفی
یک برنامه وب تمام‌پشته برای اشتراک‌گذاری دستور پخت و برنامه‌ریزی وعده‌های غذایی. این پلتفرم به کاربران اجازه می‌دهد تا دستور پخت‌ها را ایجاد، به اشتراک بگذارند و کشف کنند و همچنین به آنها کمک می‌کند تا وعده‌های هفتگی خود را به طور کارآمد برنامه‌ریزی کنند.

### ویژگی‌ها
- 🔐 **احراز هویت کاربر**
  - ثبت‌نام و ورود امن
  - احراز هویت مبتنی بر JWT
  - مدیریت پروفایل کاربر
  - پیگیری ترجیحات غذایی

- 📝 **مدیریت دستور پخت**
  - ایجاد، خواندن، به‌روزرسانی و حذف دستور پخت‌ها
  - پشتیبانی از آپلود تصویر
  - جستجو و فیلتر دستور پخت‌ها
  - قابلیت لایک و کامنت
  - برچسب‌های رژیمی و سطوح دشواری

- 🗓️ **برنامه‌ریزی وعده‌های غذایی**
  - ایجاد برنامه هفتگی وعده‌ها
  - تولید لیست خرید
  - پیگیری کالری
  - مدیریت بودجه
  - پیگیری وضعیت اقلام لیست خرید

- 🔍 **ویژگی‌های پیشرفته**
  - جستجوی متن کامل
  - فیلتر بر اساس ترجیحات غذایی
  - توصیه‌های دستور پخت
  - ویژگی‌های اجتماعی (لایک، کامنت)
  - پشتیبانی از آپلود تصویر

### فناوری‌های استفاده شده
- **بک‌اند**: Node.js، Express.js
- **پایگاه داده**: MongoDB
- **احراز هویت**: JWT
- **آپلود فایل**: Multer
- **مستندات API**: Swagger/OpenAPI
- **اعتبارسنجی**: Express-validator
- **کش**: Redis
- **ثبت رویداد**: Winston

### پیش‌نیازها
- Node.js (نسخه ۱۴ یا بالاتر)
- MongoDB
- Redis (برای کش)
- npm یا yarn

### نصب

۱. کلون کردن مخزن:
```bash
git clone https://github.com/yourusername/recipe-sharing-app.git
cd recipe-sharing-app
```

۲. نصب وابستگی‌ها:
```bash
npm install
```

۳. ایجاد فایل `.env` در پوشه اصلی:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
```

۴. اجرای سرور:
```bash
npm start
```

### مستندات API
دسترسی به مستندات API در آدرس `http://localhost:3000/api-docs`

### مشارکت
۱. فورک کردن مخزن
۲. ایجاد شاخه ویژگی جدید (`git checkout -b feature/AmazingFeature`)
۳. ثبت تغییرات (`git commit -m 'Add some AmazingFeature'`)
۴. ارسال به شاخه (`git push origin feature/AmazingFeature`)
۵. ایجاد Pull Request

### مجوز
این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات بیشتر به فایل [LICENSE](LICENSE) مراجعه کنید. 