'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function SankalpForm({ title, subtitle, style, lightTheme = false }) {
  const { sankalpNote, setSankalpNote } = useCart();

  const handleChange = (field, val) => {
    setSankalpNote(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const bgBox = lightTheme ? '#EFE7DA' : '#EFE7DA';
  const borderLeftColor = '#B18F52';
  const labelColor = '#4A3E31';
  const inputBg = lightTheme ? '#FAF5EC' : '#F7F2E9';
  const inputBorder = '1px solid rgba(23,19,15,.18)';

  return (
    <div
      style={{
        background: bgBox,
        padding: 'clamp(20px,3.5vw,32px)',
        borderLeft: `4px solid ${borderLeftColor}`,
        borderRadius: '2px',
        ...style
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px,2.2vw,28px)',
          fontWeight: 400,
          margin: '0 0 6px',
          color: '#17130F'
        }}
      >
        {title || 'Add your Sankalp Details'}
      </h3>
      <p
        style={{
          fontSize: '13px',
          color: '#5C5147',
          lineHeight: 1.6,
          margin: '0 0 24px'
        }}
      >
        {subtitle ||
          'Your name, gotra, nakshatra, and prayer intention will be written on your sacred sankalp card and included in archana in Kashi.'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Row 1: Name & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
              Name *
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={sankalpNote?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              style={{
                width: '100%',
                background: inputBg,
                border: inputBorder,
                padding: '12px 14px',
                fontSize: '13.5px',
                color: '#17130F',
                outline: 'none',
                borderRadius: '2px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
              Email *
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={sankalpNote?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{
                width: '100%',
                background: inputBg,
                border: inputBorder,
                padding: '12px 14px',
                fontSize: '13.5px',
                color: '#17130F',
                outline: 'none',
                borderRadius: '2px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Row 2: Phone number */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Phone number *
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={sankalpNote?.phoneCode || '+91'}
              onChange={(e) => handleChange('phoneCode', e.target.value)}
              style={{
                background: inputBg,
                border: inputBorder,
                padding: '12px 10px',
                fontSize: '13.5px',
                color: '#17130F',
                outline: 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              <option value="+91">IN (+91)</option>
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+1">CA (+1)</option>
              <option value="+61">AU (+61)</option>
              <option value="+65">SG (+65)</option>
            </select>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={sankalpNote?.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              style={{
                flex: 1,
                background: inputBg,
                border: inputBorder,
                padding: '12px 14px',
                fontSize: '13.5px',
                color: '#17130F',
                outline: 'none',
                borderRadius: '2px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Row 3: Gotram */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Gotram
          </label>
          <input
            type="text"
            placeholder="Enter your family gotram"
            value={sankalpNote?.gotram || ''}
            onChange={(e) => handleChange('gotram', e.target.value)}
            style={{
              width: '100%',
              background: inputBg,
              border: inputBorder,
              padding: '12px 14px',
              fontSize: '13.5px',
              color: '#17130F',
              outline: 'none',
              borderRadius: '2px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Row 4: Nakshatra */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Nakshatra
          </label>
          <input
            type="text"
            placeholder="Enter your birth nakshatra"
            value={sankalpNote?.nakshatra || ''}
            onChange={(e) => handleChange('nakshatra', e.target.value)}
            style={{
              width: '100%',
              background: inputBg,
              border: inputBorder,
              padding: '12px 14px',
              fontSize: '13.5px',
              color: '#17130F',
              outline: 'none',
              borderRadius: '2px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Row 5: Rasi */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Rasi
          </label>
          <input
            type="text"
            placeholder="Enter your rasi / zodiac sign"
            value={sankalpNote?.rasi || ''}
            onChange={(e) => handleChange('rasi', e.target.value)}
            style={{
              width: '100%',
              background: inputBg,
              border: inputBorder,
              padding: '12px 14px',
              fontSize: '13.5px',
              color: '#17130F',
              outline: 'none',
              borderRadius: '2px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Row 6: Select Your Pooja Date */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Select Your Pooja Date
          </label>
          <select
            value={sankalpNote?.poojaDate || 'August 3, 2026'}
            onChange={(e) => handleChange('poojaDate', e.target.value)}
            style={{
              width: '100%',
              background: inputBg,
              border: inputBorder,
              padding: '12px 14px',
              fontSize: '13.5px',
              color: '#17130F',
              outline: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            <option value="August 3, 2026">August 3, 2026 (Upcoming Auspicious Monday)</option>
            <option value="August 10, 2026">August 10, 2026 (Shravan Somvar)</option>
            <option value="August 17, 2026">August 17, 2026 (Pradosham Archana)</option>
            <option value="August 24, 2026">August 24, 2026 (Ekadashi Pooja)</option>
            <option value="September 1, 2026">September 1, 2026 (Purnima Archana)</option>
            <option value="September 8, 2026">September 8, 2026 (Ganesh Chaturthi Special)</option>
            <option value="September 15, 2026">September 15, 2026 (Anant Chaturdashi)</option>
            <option value="Custom Date / As per temple priest schedule">Custom Date / Temple Priest Schedule</option>
          </select>
        </div>

        {/* Row 7: Your Sankalp & Prayers */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: labelColor, marginBottom: '6px' }}>
            Your Sankalp &amp; Prayers
          </label>
          <textarea
            rows={4}
            placeholder="Enter your sankalp / prayer intention (e.g. Good health, prosperity, family well-being)"
            value={sankalpNote?.prayers || ''}
            onChange={(e) => handleChange('prayers', e.target.value)}
            style={{
              width: '100%',
              background: inputBg,
              border: inputBorder,
              padding: '12px 14px',
              fontSize: '13.5px',
              color: '#17130F',
              outline: 'none',
              borderRadius: '2px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  );
}
