#! Groovy

pipeline {
    agent { label 'perl5smokedb' }
    stages {
        stage('Build') {
            steps {
                script { echo "Building branch: " + scm.branches[0].name }
                sh '''
npm install
npm run build
                '''
            }
        }
        stage('DeployPreview') {
            when {
                // branch 'preview'
                expression {
                    echo "BRANCH_NAME is ${scm.branches[0].name}"
                    return scm.branches[0].name == "preview"
                }
            }
            steps {
                sshagent(['ssh-deploy']) {
                    sh '''
/usr/bin/deploy -av dist/ perl5smokedb.fritz.box:/var/lib/www/CoreSmokeDBWeb-preview/
                    '''
                }
            }
        }
    }
}
