// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
// eslint-disable-next-line no-undef
module.exports = {
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
    },
    prompt: {
        alias: { fd: 'docs: fix typos' },
        messages: {
            type: '选择要提交的变更类型:',
            scope: '表示此更改的范围 (可选):',
            customScope: '表示此更改的范围:',
            subject: '写一个简短的，祈使时态的变化描述:\n',
            body: '提供更改的详细说明 (可选)。使用 “|” 换行:\n',
            breaking: '列出任何重大更改 (可选)。使用 “|” 换行:\n',
            footerPrefixesSelect: '按此更改选择更改列表的问题类型 (可选):',
            customFooterPrefix: '输入问题前缀:',
            footer: '列出此更改的任何问题。例如: #31，#34:\n',
            generatingByAI: '正在生成您的AI提交主题...',
            generatedSelectByAI: '选择合适的主题由AI生成:',
            confirmCommit: '你确定要继续上面的提交吗?',
        },
        types: [
            {
                value: 'feat',
                name: 'feat: 新功能',
                emoji: ':sparkles:',
            },
            { value: 'fix', name: 'fix:      A bug fix', emoji: ':bug:' },
            {
                value: 'docs',
                name: 'docs: 修复bug',
                emoji: ':memo:',
            },
            {
                value: 'style',
                name: 'style: 代码格式改变',
                emoji: ':lipstick:',
            },
            {
                value: 'refactor',
                name: 'refactor: 某个已有功能重构',
                emoji: ':recycle:',
            },
            {
                value: 'perf',
                name: 'perf: 性能优化',
                emoji: ':zap:',
            },
            {
                value: 'test',
                name: 'test:     Adding missing tests or correcting existing tests',
                emoji: ':white_check_mark:',
            },
            {
                value: 'build',
                name: 'build: 增加测试',
                emoji: ':package:',
            },
            {
                value: 'ci',
                name: 'ci: CI配置文件和脚本的更改',
                emoji: ':ferris_wheel:',
            },
            {
                value: 'chore',
                name: 'chore: 除src 不修改src或测试文件的其他更改',
                emoji: ':hammer:',
            },
            {
                value: 'revert',
                name: 'revert: 回滚上次提交',
                emoji: ':rewind:',
            },
        ],
        useEmoji: false,
        emojiAlign: 'center',
        useAI: false,
        aiNumber: 1,
        themeColorCode: '',
        scopes: [],
        allowCustomScopes: true,
        allowEmptyScopes: true,
        customScopesAlign: 'bottom',
        customScopesAlias: 'custom',
        emptyScopesAlias: 'empty',
        upperCaseSubject: false,
        markBreakingChangeMode: false,
        allowBreakingChanges: ['feat', 'fix'],
        breaklineNumber: 100,
        breaklineChar: '|',
        skipQuestions: [],
        issuePrefixes: [
            { value: 'closed', name: 'closed:   ISSUES has been processed' },
        ],
        customIssuePrefixAlign: 'top',
        emptyIssuePrefixAlias: 'skip',
        customIssuePrefixAlias: 'custom',
        allowCustomIssuePrefix: true,
        allowEmptyIssuePrefix: true,
        confirmColorize: true,
        scopeOverrides: undefined,
        defaultBody: '',
        defaultIssues: '',
        defaultScope: '',
        defaultSubject: '',
    },
}
