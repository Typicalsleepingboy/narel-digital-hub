# NareL Digital - Premium Digital Marketplace

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui

## 📋 Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd narel-digital-hub
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using bun
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using bun
   bun run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

### Environment Validation

The application includes built-in environment variable validation that will:
- Check for missing required variables on startup
- Provide clear error messages if configuration is incomplete
- Prevent runtime errors due to misconfiguration

If you encounter environment-related errors, ensure your `.env` file contains all required variables as specified in `.env.example`.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── Footer.tsx      # Main footer component
│   ├── Navbar.tsx      # Navigation component
│   ├── ProductCard.tsx # Product display card
│   └── ProductGrid.tsx # Product listing grid
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── ProductDetail.tsx # Product detail page
│   ├── Admin.tsx       # Admin panel
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── assets/             # Static assets (images, icons)
```

## 🎨 Customization

### Colors and Theming
The project uses Tailwind CSS with custom color variables defined in `tailwind.config.ts`.

### Adding New Products
Products are managed through the Supabase admin panel. Use the admin interface at `/admin` to add, edit, or remove products.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to NareL Digital.

## 📞 Support

- **WhatsApp**: +62 899-217-3777
- **Discord**: [Join our community](https://discord.gg/narelid)
- **Instagram**: [@narel.idn](https://www.instagram.com/narel.idn)
- **Email**: support@narel.id

## 🙏 Acknowledgments

- **sleeping.stu**: Development partnership and technical support
- **Supabase**: Amazing backend-as-a-service platform
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework

---

