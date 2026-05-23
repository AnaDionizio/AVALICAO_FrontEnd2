import { createTheme } from '@mui/material/styles';

const glassBackground = 'rgba(255,255,255,0.2)';
const glassBorder = '1px solid rgba(255,255,255,0.35)';

const theme = createTheme({
  palette: {

    primary: {
      main: '#ffffff',
    },

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.75)',
    },

    background: {
      default: 'transparent',
      paper: 'rgba(255,255,255,0.12)',
    },
  },

typography: {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

  allVariants: {
    textAlign: 'center',
    color: '#fff',
  },
},

  shape: {
    borderRadius: 8,
  },

  components: {
MuiCssBaseline: {
  styleOverrides: {
    body: {
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      textAlign: 'center',
      color: '#fff',
    },

    '*': {
      boxSizing: 'border-box',
    },

    '::placeholder': {
      color: 'rgba(255,255,255,0.6)',
      opacity: 1,
    },
  },
},

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          background: glassBackground,
          backdropFilter: 'blur(4px)',
          color: '#fff',

          '& fieldset': {
            border: glassBorder,
          },

          '&:hover fieldset': {
            border: '1px solid rgba(255,255,255,0.5)',
          },

          '&.Mui-focused fieldset': {
            border: '1px solid rgba(255,255,255,0.7)',
          },

          '& input': {
            padding: '12px 16px',
            color: '#fff',
          },

          '& input::placeholder': {
            color: 'rgba(255,255,255,0.6)',
            opacity: 1,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.25)',
          border: glassBorder,
          backdropFilter: 'blur(4px)',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',

          '&:hover': {
            background: 'rgba(255,255,255,0.35)',
            boxShadow: 'none',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: glassBackground,
          backdropFilter: 'blur(4px)',
          border: glassBorder,
          boxShadow: 'none',
          color: '#fff',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: glassBackground,
          backdropFilter: 'blur(4px)',
          border: glassBorder,
          boxShadow: 'none',
          color: '#fff',
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
});

export default theme;