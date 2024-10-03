# 🖋️ persian-fontify

[![Twitter Follow](https://img.shields.io/twitter/follow/rezasmind?style=social)](https://twitter.com/rezasmind)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-rezasmind-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/rezasmind/)

A CLI tool to easily integrate Persian fonts into your web projects. 🚀✨

## ✨ Features

- 📥 Downloads popular Persian fonts
- 🎨 Updates your CSS with @font-face declarations
- 🛠️ Modifies Tailwind CSS config to include new fonts
- 💬 Simple interactive prompts for easy setup

## 📦 Installation
```bash
npm install -g persian-fontify
```

🚀 Usage
📂 Navigate to your project directory
🖥️ Run the tool:
```bash
npx persian-fontify setup
```

🧭 Follow the prompts:
- 🔤 Select a Persian font
- 📄 Provide path to your main CSS file
- ⚙️ Provide path to your Tailwind config file

## 🔤 Supported Fonts
- Vazir
- Sahel
- Samim
- Shabnam
- Gandom

## 💡 Example
After running persian-fontify:
Your CSS file will include:

  @font-face {
     font-family: 'Vazir';
     src: url('path/to/Vazir.ttf') format('truetype');
     font-weight: 400;
     font-style: normal;
   }

   Your Tailwind config will be updated:

   module.exports = {
     theme: {
       extend: {
         fontFamily: {
           vazir: ['Vazir', 'sans-serif'],
         },
       },
     },
   }

   Use the font in your HTML:


   <p class="font-vazir">This text uses Vazir font</p>

## 🔧 Troubleshooting
📍 Ensure you're in the correct directory
🔍 Check file paths and permissions
🆘 For more help, open an issue on GitHub

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 🎉
## 📄 License
This project is licensed under the MIT License. 📜
---
Made with ❤️ by rezasmind
