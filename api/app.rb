Mongoid.load!("mongoid.yml", :development)

class OCCApi < Sinatra::Base
  
  get '/' do
    "Welcome to the API"
  end
  
  #
  # API CALLS TO UPDATE TASK LIST(S)
  #


  # get all tasks lists
  get '/lists/?' do
    # return success status
    status 200

    # allow anyone to access
    headers['Access-Control-Allow-Origin'] = '*'

    # return all task lists in JSON format
    content_type :json
    Tasklist.all.to_json
  end

  # create a new task list
  post '/lists/:listname' do
    listname = params[:listname]
    Tasklist.new(title: listname).save

    return "${listname} has been created"
  end

  # update a task list
  put '/lists/:id' do
    id = params[:id]
    title = params[:title]
    Tasklist.where(id: id).update(title: title)
  end

  delete "/lists/:id" do
    id = params[:id]
    tasklist = Tasklist.where(id: id)
    
    unless !tasklist.exists?
        tasklist.delete
      else
        return "That Tasklist ID does not exist"
    end

  end


end


class Tasklist
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embeds_many :tasks
end

class Task
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embedded_in :tasklist
end