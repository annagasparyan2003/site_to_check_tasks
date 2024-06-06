/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
          resolveAlias: {
            // TurboPack еще не поддерживает стандартные пути импорта ESM
            '@/components/show-preview-file': './components/show-preview-file.jsx',
            /**
             *Критическое: предотвращает " ⨯ ./node_modules/canvas/build/Release/canvas.node
             * Ошибка модуля Parse: неожиданный характер '�' (1:0)" error
             */
            canvas: './empty-module.ts',
          },
        },
      },
      webpack: (config) => {
        /**
         * Критическое: предотвращает " ⨯ ./node_modules/canvas/build/Release/canvas.node
         * Ошибка модуля Parse: неожиданный характер '�' (1:0)" error
         */
        config.resolve.alias.canvas = false;
    
        // Возможно, вам это не понадобится, это просто для поддержки модулеролиции: 'Node16'
        config.resolve.extensionAlias = {
          '.js': ['.js', '.ts', '.tsx'],
        };
    
        return config;
      },
};

export default nextConfig;
