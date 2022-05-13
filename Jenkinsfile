node('prod-devops'){
    wrap([$class: 'TimestamperBuildWrapper']) {
    try{
        stage('Checkout'){
            sh '''
                set -x
                cd /opt/build/assignment_angular
                git clean -fd
                git checkout -f ${BRANCH}
                git pull                    
                git status
                git log  --pretty=oneline | head -n 10
            '''
            }
            
        stage('Build'){
            sh '''
                cd /opt/build/assignment_angular
                npm install
                /home/ubuntu/.nvm/versions/node/v14.19.2/bin/ng build --prod
            '''
        }
        
    stage('Deploy'){
        sh '''
            cd /opt/build/assignment_angular/dist
            aws s3 sync . s3://angularcatofthehour/  --storage-class INTELLIGENT_TIERING
        '''
    }
    
    } catch (error) {
        currentBuild.result = "FAILED"
        notifyFailed()
        throw error
    }
    }
}

def notifyFailed() {
    wrap([$class: 'BuildUser']) {
    def user = env.BUILD_USER_FIRST_NAME
  }
  emailext (
      subject: "Jenkins job '${env.JOB_NAME}' #${env.BUILD_NUMBER} FAILED",
      body: """<p>Hi ${env.user},</p>
      <p>You jenkins job "${env.JOB_NAME}" (build number ${env.BUILD_NUMBER}) got failed.'
      <br>You can check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>
      <br>
      <br></p>
      <p><em>-DevOps team</em></p>""",
      recipientProviders: [[$class: 'RequesterRecipientProvider']]
    )
}
