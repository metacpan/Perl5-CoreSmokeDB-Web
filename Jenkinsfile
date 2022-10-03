#! Groovy

pipeline {
    agent { label 'perl5smokedb' }
    parameters {
        string(
            name: 'buildBranch',
            defaultValue: 'preview',
            description: 'This is the name of the branch to build'
        )
    }
    stages {
        stage('Build') {
            steps {
                script { echo "Building branch: " + params.buildBranch }
                script {
                    sh """
npm install
npm run test
npm run build:${params.buildBranch}
                    """
                }
            }
        }
        stage('DeployPreview') {
            when {
                // branch 'preview'
                expression {
                    echo "BRANCH_NAME is ${params.buildBranch}" //${scm.branches[0].name}"
                    return params.buildBranch == "preview"
                }
            }
            steps {
                sshagent(['ssh-deploy']) {
                    sh '''
/usr/bin/deploy -av dist/ perl5smokedb.fritz.box:/var/lib/www/CoreSmokeDBWeb.preview/
                    '''
                }
            }
        }
        stage('DeployProduction') {
            when {
                // branch 'main'
                expression {
                    echo "BRANCH_NAME is ${params.buildBranch}"
                    return params.buildBranch == "main"
                }
            }
            steps {
                script {
                    def usrinput = input message: "Deploy or Abort ?", ok: "Deploy!"
                }
                sshagent(['ssh-deploy']) {
                    sh '''
/usr/bin/deploy -av dist/ perl5smokedb.fritz.box:/var/lib/www/CoreSmokeDBWeb/
                    '''
                }
            }
        }
    }
}
