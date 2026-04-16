export function FontLink() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap');
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
      :root{--font-sans: "Plus Jakarta Sans", Outfit, ui-sans-serif, system-ui, -apple-system, sans-serif;}
      body{margin:0;background:var(--bg-base,#080c14);font-family:var(--font-sans);} 
      input:focus{outline:2px solid var(--color-primary-glow,rgba(110,231,247,0.45))!important;}
      @keyframes fadeSlideUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
      @keyframes popIn{from{opacity:0;transform:scale(0.72)}to{opacity:1;transform:scale(1)}}
      @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
      @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-72px) scale(1.4)}}
      @keyframes breathe{0%,100%{transform:scale(1);opacity:0.75}50%{transform:scale(1.13);opacity:1}}
      @keyframes contractPulse{0%,100%{filter:brightness(1) drop-shadow(0 0 4px rgba(110,231,247,0.4))}50%{filter:brightness(1.3) drop-shadow(0 0 14px rgba(110,231,247,0.95))}}
      .anim-in{animation:fadeSlideUp 0.36s cubic-bezier(.22,1,.36,1) both}
      .pop-in{animation:popIn 0.3s cubic-bezier(.22,1,.36,1) both}
      .pulse-a{animation:pulse 1.3s ease-in-out infinite}
      .breathe{animation:breathe 3.5s ease-in-out infinite}
      .contract-glow{animation:contractPulse 1.2s ease-in-out infinite}
    `}</style>
  );
}
