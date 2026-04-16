import {
  House,
  Barbell,
  ChartBar,
  PlusCircle,
  BookOpenText,
  CheckCircle,
  CaretLeft,
  Trash,
  Clock,
  Star,
  Play,
  Pause,
  SkipForward,
  Trophy,
  Fire,
  Lightning,
  Lock,
  Info,
  CaretDown,
  CaretUp,
  CaretRight,
  CalendarDots,
  Target,
  Sparkle,
  ArrowLeft,
  CheckFat,
  SealCheck,
  Moon,
  Sun,
  X,
  Coins,
  UserCircle,
} from '@phosphor-icons/react';

// All nav/action icons are zero-arg functions so they can be used
// as <Ic /> via variable assignment (React passes props={} otherwise).
export const I = {
  /* ── Navigation ─────────────────────────────── */
  home:         () => <House         size={24} weight="bold"    />,
  play:         () => <Barbell       size={24} weight="bold"    />,
  chart:        () => <ChartBar      size={24} weight="bold"    />,
  plus:         () => <PlusCircle    size={24} weight="bold"    />,
  book:         () => <BookOpenText  size={24} weight="bold"    />,

  /* ── Actions ─────────────────────────────────── */
  back:         () => <ArrowLeft     size={22} weight="bold"    />,
  trash:        () => <Trash         size={16} weight="bold"    />,
  clk:          () => <Clock         size={12} weight="bold"    />,

  /* ── Called with args ────────────────────────── */
  check:  (size = 18) => <CheckFat   size={size} weight="bold" />,
  star:   (size = 13, color = 'var(--color-gold)') =>
    <Star size={size} weight="fill" color={color} />,

  /* ── Workout controls ────────────────────────── */
  playBtn:      () => <Play          size={22} weight="fill"    />,
  pause:        () => <Pause         size={22} weight="fill"    />,
  skip:         (size = 20) => <SkipForward size={size} weight="bold" />,

  /* ── Misc / v2 ───────────────────────────────── */
  trophy:       () => <Trophy        size={20} weight="bold"    />,
  flame:        () => <Fire          size={20} weight="bold"    />,
  zap:          () => <Lightning     size={16} weight="bold"    />,
  lock:         () => <Lock          size={18} weight="bold"    />,
  info:         () => <Info          size={16} weight="bold"    />,
  chevronDown:  () => <CaretDown     size={18} weight="bold"    />,
  chevronUp:    () => <CaretUp       size={18} weight="bold"    />,
  chevronRight: (size = 16) => <CaretRight size={size} weight="bold" />,
  calendar:     () => <CalendarDots  size={18} weight="bold"    />,
  target:       () => <Target        size={18} weight="bold"    />,
  sparkles:     () => <Sparkle       size={18} weight="bold"    />,
  sealCheck:    () => <SealCheck     size={18} weight="bold"    />,
  checkCircle:  () => <CheckCircle   size={18} weight="bold"    />,
  caretLeft:    () => <CaretLeft     size={18} weight="bold"    />,
  moon:         () => <Moon          size={20} weight="bold"    />,
  sun:          () => <Sun           size={20} weight="bold"    />,
  close:        () => <X             size={18} weight="bold"    />,
  coins:        (size = 16) => <Coins size={size} weight="bold" />,
  user:         (size = 20) => <UserCircle size={size} weight="bold" />,
};


