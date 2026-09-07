import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';
import { getRecentPayments } from '../services/api';

const defaultPayments = [
  {
    txHash: "0x2a7e4b9d7e189c2049e7b1a2098492048f0294e6a4d71",
    currency: "USDTBSC",
    amount: "$1003.04",
    tokenPriceUsd: "0.036330",
    lmx: "27,609",
    date: "Sep 7, 2026, 03:01 PM"
  },
  {
    txHash: "0x22f28a9b1c7849e7b102948c8b7492048f01834d23d",
    currency: "USDTBSC",
    amount: "$2000.00",
    tokenPriceUsd: "0.036330",
    lmx: "55,050",
    date: "Sep 7, 2026, 02:52 PM"
  },
  {
    txHash: "0x4de03948b8c719e7b1a2094892048f01839a674816",
    currency: "USDTBSC",
    amount: "$500.00",
    tokenPriceUsd: "0.036330",
    lmx: "13,762",
    date: "Sep 7, 2026, 02:45 PM"
  },
  {
    txHash: "0x51bdd6f8b66ad73492fe15b046b53afc6863365676c1ed418bd408f658372922",
    currency: "USDTBSC",
    amount: "$450.00",
    tokenPriceUsd: "0.036330",
    lmx: "12,386",
    date: "Sep 7, 2026, 02:39 PM"
  },
  {
    txHash: "0x8240c499ad0824f832547ca9c86e1e3c0ecf502168f473543494ebbe76cd0cc8",
    currency: "USDTBSC",
    amount: "$726.50",
    tokenPriceUsd: "0.036330",
    lmx: "19,997",
    date: "Sep 7, 2026, 02:33 PM"
  },
  {
    txHash: "0x3afcf71a0497a6dccec32af6bad906758beb0e0ca9423026ad7d6431980be18a",
    currency: "USDTBSC",
    amount: "$3891.80",
    tokenPriceUsd: "0.036330",
    lmx: "107,123",
    date: "Sep 7, 2026, 02:26 PM"
  }
];

export const LiveAuctionTable = () => {
  const [payments, setPayments] = useState(defaultPayments);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalTransactions = 19240;
  const totalPages = 3207;

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await getRecentPayments(currentPage, 6);
      if (res?.data?.payments && res.data.payments.length > 0) {
        setPayments(
          res.data.payments.map((p) => ({
            txHash: p.txHash,
            currency: p.currency || 'USDTBSC',
            amount: `$${Number(p.usdValue || 0).toFixed(2)}`,
            tokenPriceUsd: Number(p.tokenPriceUsd || 0.03633).toFixed(6),
            lmx: Math.floor(Number(p.tokenAmount || 0)).toLocaleString(),
            date: p.createdAt
              ? new Date(p.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Sep 7, 2026, 03:01 PM'
          }))
        );
      }
    };
    fetchPayments();
  }, [currentPage]);

  const copyHash = (hash, idx) => {
    navigator.clipboard.writeText(hash);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const truncateHash = (hash) => {
    if (!hash || hash.length < 16) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  return (
    <div className="flex items-center justify-center md:p-4 relative overflow-hidden mb-8">
      <img
        alt=""
        className="absolute top-0 h-full left-12 -z-1 blur-2xl opacity-50"
        src="/images/mIeiiFyiLX8guUCulp8nzYRde7s.avif"
      />
      <div className="w-full max-w-7xl rounded-2xl bg-[#08021c]/50 border-2 border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.15)] md:p-3 mt-3">
        <h2 className="text-white text-2xl font-semibold flex items-center gap-2 p-3 mb-2 md:mb-4">
          <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
          Live Auction Activity
        </h2>
        <div className="px-3 pb-3 md:pb-10">
          <div className="md:bg-[#070b14] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white hidden sm:table">
                <thead className="bg-[#191919] text-gray-300 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-3 py-3 text-left">TRX HASH</th>
                    <th className="px-3 py-3 text-center">Currency</th>
                    <th className="px-3 py-3 text-right">Amount</th>
                    <th className="px-3 py-3 text-right">Token Price (USD)</th>
                    <th className="px-3 py-3 text-center">SHUK13 Token</th>
                    <th className="px-3 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payments.map((p, index) => {
                    const isCopied = copiedIndex === index;
                    return (
                      <tr key={index} className="group hover:bg-[#191919] transition-colors duration-150 even:bg-[#191919]">
                        <td className="px-3 py-3 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-blue-400 bg-black/30 px-3 py-1 rounded-lg border border-white/5">
                              {truncateHash(p.txHash)}
                            </span>
                            <button
                              onClick={() => copyHash(p.txHash, index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                            >
                              {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-300" />}
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold text-gray-300 bg-gray-400/10">
                            {p.currency}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <span className="font-bold text-base bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {p.amount}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <span className="font-bold text-base bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {p.tokenPriceUsd}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="text-base font-semibold text-purple-400 flex items-center justify-center gap-1">
                            <img alt="SHUK13 Token" className="w-4 h-4 object-contain rounded-full" src="/images/coin.png" />
                            {p.lmx}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-gray-300">{p.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Mobile Card List */}
              <div className="sm:hidden space-y-3">
                {payments.map((p, index) => {
                  const isCopied = copiedIndex === index;
                  return (
                    <div key={index} className="bg-[#191919] rounded-xl border border-white/5 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            alt={p.currency}
                            className="w-8 h-8 rounded-full ring-2 ring-white/10 object-contain"
                            loading="lazy"
                            src="/images/coins/usdtbsc.svg"
                            onError={(e) => { e.currentTarget.src = '/images/coin.png'; }}
                          />
                          <span className="px-2 py-1 rounded-lg text-xs font-semibold text-gray-300 bg-gray-400/10">
                            {p.currency}
                          </span>
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {p.amount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/5 pt-2">
                        <span className="text-gray-300 text-xs">TRX HASH</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-blue-400 bg-black/30 px-2 py-1 rounded-lg">
                            {truncateHash(p.txHash)}
                          </span>
                          <button
                            onClick={() => copyHash(p.txHash, index)}
                            className="flex items-center justify-center w-7 h-7 rounded-md border border-white/10 bg-black/30"
                          >
                            {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-300" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-300 text-xs block">Token Price</span>
                          <span className="font-semibold text-sm text-white">${p.tokenPriceUsd}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-300 text-xs block">SHUK13 Token</span>
                          <span className="text-base font-semibold text-purple-400 flex items-center gap-1">
                            <img alt="SHUK13 Token" className="w-4 h-4 rounded-full" src="/images/coin.png" />
                            {p.lmx}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/5 pt-2">
                        <span className="text-gray-300 text-xs">Date</span>
                        <span className="text-gray-300 text-sm">{p.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col gap-4 border-t border-white/5 bg-[#070b14] px-4 py-4 text-sm text-gray-300 xl:flex-row xl:items-center xl:justify-between">
              <span>
                Showing {(currentPage - 1) * 6 + 1}-{Math.min(currentPage * 6, totalTransactions)} of {totalTransactions.toLocaleString()} transactions
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={`min-w-10 rounded-lg border px-3 py-2 font-semibold transition ${
                      currentPage === 1
                        ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(2)}
                    className={`min-w-10 rounded-lg border px-3 py-2 font-semibold transition ${
                      currentPage === 2
                        ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    2
                  </button>
                  <span className="px-2 text-xs font-semibold text-gray-500">...</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    className={`min-w-10 rounded-lg border px-3 py-2 font-semibold transition ${
                      currentPage === totalPages
                        ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {totalPages}
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionTable;
