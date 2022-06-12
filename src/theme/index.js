import {
    createTheme
} from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import {
    prefixer
} from 'stylis';

export const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            "Yekan",
            "sans-serif"
        ].join(",")
    }
});

export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});