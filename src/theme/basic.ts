import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif !important;

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      transition-delay: 99999s;
    }

    ul,
    ol,
    dl {
      padding-left: 0;
    }

    iframe {
      border: 0;
    }

    a {
      text-decoration: none;

      &:focus,
      &:hover {
        text-decoration: none;
      }
    }

    .ant-btn,
    .ant-input-affix-wrapper,
    .ant-form-item-control-input-content .ant-input,
    .ant-select,
    .ant-checkbox,
    .ant-radio-button-wrapper {
      box-shadow: 0 2px 0 rgba(0, 0, 0, .04);
    }

    .ant-input-affix-wrapper .ant-input,
    .ant-btn-link {
      box-shadow: none;
    }

    .ant-collapse-borderless {
      background-color: #fff;
    }

    .ant-layout {
      background: #f4f8fd;
    }

    .ant-modal-mask {
      background-color: rgba(5, 14, 42, 0.3);
    }

    .ant-modal-footer {
      padding: 24px;
    }

    .ant-cascader-menus {
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);

      .ant-cascader-menu-item {
        font-size: 13px;
        padding: 10px 20px 10px 10px;

        .ant-cascader-menu-item-expand-icon {
          right: 5px;
        }

        &.ant-cascader-menu-item-active {
          font-weight: normal;
          color: #1990ff;
        }
      }
    }

    .ant-btn-disabled,
    .ant-btn-disabled.active,
    .ant-btn-disabled:active,
    .ant-btn-disabled:focus,
    .ant-btn-disabled:hover,
    .ant-btn.disabled,
    .ant-btn.disabled.active,
    .ant-btn.disabled:active,
    .ant-btn.disabled:focus,
    .ant-btn.disabled:hover,
    .ant-btn[disabled],
    .ant-btn[disabled].active,
    .ant-btn[disabled]:active,
    .ant-btn[disabled]:focus,
    .ant-btn[disabled]:hover {
      color: hsla(0, 0%, 75%, 1);
      background-color: hsla(0, 0%, 98%, 1);
      border-color: hsla(0, 0%, 90%, 1);
    }

    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #f4f8fd;
    }

    .ant-pagination.mini {
      .ant-pagination-options {
        margin-left: 5px;
      }

      .ant-select-selection-item,
      .ant-pagination-total-text {
        font-size: 12px !important;
        line-height: 22px !important;
      }
    }
  }
`;
