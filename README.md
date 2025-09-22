# Ztartverse™ - Modular Metaverse Platform

Ztartverse is a cutting-edge metaverse platform built with TypeScript and React, featuring real-world Earth-based exploration, integrated identity systems, and cryptocurrency support. Think Google Earth meets GTA Online with ReadyPlayerMe-style customization.

## 🌟 Key Features

### 🗺️ 3-Tier Map Navigation System
- **Earth Level**: Global overview with continent and region selection
- **Region Level**: Detailed area exploration with zone filtering
- **Zone Level**: Immersive local environments with real-time user interaction

### 🆔 Ztartag Universal Identity Integration
- Seamless single sign-on with Ztartag identity system
- Verified user profiles with reputation scoring
- Cross-platform identity management

### 💰 Ztart Ecosystem Compatibility
- **Ztart Wallet** integration for secure transactions
- **ZTART Coin** payments for virtual goods and services
- NFT support and digital asset management

### 🎮 Gamified User Experience
- Level progression system with XP rewards
- Achievement unlocking with rarity tiers
- Reputation-based social features

### 🏢 Virtual Economy
- Business registration and management
- Virtual storefronts accepting ZTART coins
- Real-time economic activity tracking

### 🌐 Multiplayer Architecture
- Real-time user presence tracking
- Zone-based chat and communication
- Event system for community activities

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom Ztart design system
- **Backend**: Supabase (PostgreSQL + Realtime + Auth + RLS)
- **Identity**: Ztartag Universal Identity System
- **Wallet**: Ztart Wallet + MetaMask compatibility
- **State Management**: React hooks + Context API
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Ztartag developer credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ztarthub/ZTARTVERSE-.git
   cd ZTARTVERSE-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Ztartag Identity System
VITE_ZTARTAG_API_URL=https://api.ztartag.com
VITE_ZTARTAG_CLIENT_ID=your-client-id
VITE_ZTARTAG_CLIENT_SECRET=your-client-secret

# Ztart Ecosystem
VITE_ZTART_TOKEN_ADDRESS=0x...
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components  
│   ├── map/             # 3-tier map navigation
│   ├── profile/         # User profile & gamification
│   ├── multiplayer/     # Real-time multiplayer features
│   └── ui/              # Reusable UI components
├── services/            # External service integrations
│   ├── supabase/        # Database & real-time services
│   ├── ztartag/         # Identity system integration
│   └── wallet/          # Wallet & cryptocurrency services
├── types/               # TypeScript type definitions
│   ├── api/             # API response types
│   ├── game/            # Game-related types
│   └── user/            # User & profile types
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── stores/              # State management
└── assets/              # Static assets
```

## 🎯 Core Concepts

### Navigation Hierarchy
```
�� Earth
  └── 🗺️ Regions (Continents/Countries)
      └── 📍 Zones (Cities/Areas)
          └── 🏢 Businesses & POIs
```

### User Progression
- **Experience Points (XP)**: Earned through exploration, social interaction, and achievements
- **Levels**: Unlock new features and privileges
- **Achievements**: Gamified milestones with rarity tiers
- **Reputation**: Community-driven trust scoring

### Virtual Economy
- **ZTART Coins**: Primary in-world currency
- **Businesses**: User-owned virtual storefronts
- **NFTs**: Digital collectibles and assets
- **Transactions**: Blockchain-verified transfers

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] 3-tier map navigation system
- [x] Ztartag identity integration
- [x] Supabase backend setup
- [x] Gamified user profiles
- [x] Basic wallet integration

### Phase 2: Enhanced Features 🚧
- [ ] 3D zone rendering
- [ ] Real-time multiplayer interactions
- [ ] AR mobile experience
- [ ] Advanced business tools
- [ ] Event management system

### Phase 3: Expansion ��
- [ ] Mobile apps (iOS/Android)
- [ ] VR compatibility
- [ ] Advanced AI features
- [ ] Multi-chain support
- [ ] Creator economy tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ by the Ztartverse team</strong>
  <br>
  <br>
  <a href="https://ztartverse.com">🌐 Website</a> •
  <a href="https://docs.ztartverse.com">📚 Docs</a> •
  <a href="https://discord.gg/ztartverse">💬 Discord</a> •
  <a href="https://twitter.com/ztartverse">🐦 Twitter</a>
</div>
