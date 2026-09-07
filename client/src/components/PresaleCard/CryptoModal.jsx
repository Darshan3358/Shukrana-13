import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const cryptoList = [
  { symbol: 'USDTBSC', name: 'USDT', network: 'bsc', icon: '/images/coins/usdtbsc.svg' },
  { symbol: 'USDT', name: 'Tether USD', network: 'eth', icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'ETH', name: 'Ethereum', network: 'eth', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'BNB', name: 'BNB Chain', network: 'bsc', icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'SOL', name: 'Solana', network: 'solana', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'USDC', name: 'USD Coin', network: 'solana', icon: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png' }
];

export const CryptoModal = ({ isOpen, onClose, onSelect, selected }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = cryptoList.filter(
    c => c.symbol.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-modal-in">
      <div className="w-full max-w-md bg-[#0e131f] border border-white/10 rounded-3xl p-6 shadow-2xl relative text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-xl font-bold">Select Currency</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition">
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crypto or network..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 pr-1">
          {filtered.map((item) => (
            <button
              key={item.symbol}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                selected?.symbol === item.symbol
                  ? 'bg-blue-600/20 border-blue-500/50 text-white'
                  : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5 text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.icon}
                  alt={item.symbol}
                  className="w-8 h-8 rounded-full object-contain bg-white/5 p-0.5"
                  onError={(e) => { e.currentTarget.src = '/images/coin.png'; }}
                />
                <div className="text-left">
                  <div className="font-semibold text-sm">{item.symbol}</div>
                  <div className="text-xs text-gray-400 uppercase">{item.network}</div>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 uppercase font-mono">
                {item.network}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoModal;
