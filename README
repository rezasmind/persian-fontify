# persian-fontify

A CLI tool to easily integrate Persian fonts into your web projects.

## Features

- Downloads popular Persian fonts
- Updates your CSS with @font-face declarations
- Modifies Tailwind CSS config to include new fonts
- Simple interactive prompts for easy setup

## Installation
npm install -g persian-fontify


## Usage

1. Navigate to your project directory
2. Run the tool:
   ```bash
   persian-fontify
   ```
3. Follow the prompts:
   - Select a Persian font
   - Provide path to your main CSS file
   - Provide path to your Tailwind config file

## Supported Fonts

- Vazir
- Sahel
- Samim
- Shabnam
- Gandom

## Example

After running persian-fontify:

1. Your CSS file will include:
   ```css
   @font-face {
     font-family: 'Vazir';
     src: url('path/to/Vazir.ttf') format('truetype');
     font-weight: 400;
     font-style: normal;
   }
   ```

2. Your Tailwind config will be updated:
   ```js
   module.exports = {
     theme: {
       extend: {
         fontFamily: {
           vazir: ['Vazir', 'sans-serif'],
         },
       },
     },
   }
   ```

3. Use the font in your HTML:
   ```html
   <p class="font-vazir">This text uses Vazir font</p>
   ```

## Troubleshooting

- Ensure you're in the correct directory
- Check file paths and permissions
- For more help, open an issue on GitHub

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.