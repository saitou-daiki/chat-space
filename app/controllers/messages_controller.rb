class MessagesController < ApplicationController
  def index
    messages = Messages.include(:group)
  end
  def create
    messages.create(messages_params)
  end
  
  private
  def messages_params
    paramus.permit(:text,:image).(user_id: current_user.id)
  end
end
