/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Social Feed - Main social feed showing user posts, discussions, and rock shares
 */

import { useState, useEffect } from 'react'
import SmartImage from '../components/SmartImage'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar, 
  User, 
  Camera,
  Plus,
  Filter,
  TrendingUp,
  Clock,
  HelpCircle,
  X,
  Repeat2,
  Star,
  Bookmark
} from 'lucide-react'
import { rocks } from '../utils/api'

const SocialFeed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('recent') // recent, popular, following
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState({})
  const [showHelp, setShowHelp] = useState(false)
  
  // User interaction states
  const [userLikes, setUserLikes] = useState(new Set())
  const [userReposts, setUserReposts] = useState(new Set())
  const [userFavorites, setUserFavorites] = useState(new Set())

  useEffect(() => {
    loadFeed()
  }, [filter])

  const loadFeed = async () => {
    try {
      setLoading(true)
      console.log('Loading feed with filter:', filter)
      const params = {
        sort: filter === 'recent' ? '-createdAt' : filter === 'popular' ? '-likes' : '-createdAt',
        limit: 20
      }
      
      const response = await rocks.getAll(params)
      console.log('Feed loaded successfully:', response)
      setPosts(response.data?.rocks || response.data || [])
    } catch (error) {
      console.error('Error loading feed, using demo data:', error)
      // Use demo data when API fails
      const demoRocks = [
        {
          _id: 'demo-1',
          title: 'Beautiful Quartz Crystal',
          description: 'Found this amazing clear quartz crystal during a hike in the mountains.',
          rockType: 'minerals',
          location: { address: 'Rocky Mountain National Park, CO' },
          likes: 24,
          reposts: 3,
          comments: [],
          createdAt: new Date().toISOString(),
          userId: { username: 'DemoUser' }
        },
        {
          _id: 'demo-2', 
          title: 'Sedimentary Layers',
          description: 'Interesting sedimentary rock showing distinct layering.',
          rockType: 'sedimentary',
          location: { address: 'Grand Canyon, AZ' },
          likes: 18,
          reposts: 1,
          comments: [],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          userId: { username: 'RockExplorer' }
        }
      ]
      setPosts(demoRocks)
      setError('') // Clear any error since we have demo data
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      const isLiked = userLikes.has(postId)
      
      if (isLiked) {
        // Unlike
        setUserLikes(prev => {
          const newLikes = new Set(prev)
          newLikes.delete(postId)
          return newLikes
        })
        setPosts(posts.map(post => 
          post._id === postId 
            ? { ...post, likes: Math.max(0, (post.likes || 0) - 1) }
            : post
        ))
      } else {
        // Like
        setUserLikes(prev => new Set([...prev, postId]))
        setPosts(posts.map(post => 
          post._id === postId 
            ? { ...post, likes: (post.likes || 0) + 1 }
            : post
        ))
      }
      
      // API call would happen here
      // await rocks.like(postId)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleRepost = async (postId) => {
    try {
      const isReposted = userReposts.has(postId)
      
      if (isReposted) {
        // Un-repost
        setUserReposts(prev => {
          const newReposts = new Set(prev)
          newReposts.delete(postId)
          return newReposts
        })
        setPosts(posts.map(post => 
          post._id === postId 
            ? { ...post, reposts: Math.max(0, (post.reposts || 0) - 1) }
            : post
        ))
      } else {
        // Repost
        setUserReposts(prev => new Set([...prev, postId]))
        setPosts(posts.map(post => 
          post._id === postId 
            ? { ...post, reposts: (post.reposts || 0) + 1 }
            : post
        ))
      }
      
      // API call would happen here
      // await rocks.repost(postId)
    } catch (error) {
      console.error('Error reposting:', error)
    }
  }

  const handleFavorite = async (postId) => {
    try {
      const isFavorited = userFavorites.has(postId)
      
      if (isFavorited) {
        // Un-favorite
        setUserFavorites(prev => {
          const newFavorites = new Set(prev)
          newFavorites.delete(postId)
          return newFavorites
        })
      } else {
        // Favorite
        setUserFavorites(prev => new Set([...prev, postId]))
      }
      
      // API call would happen here
      // await rocks.favorite(postId)
    } catch (error) {
      console.error('Error favoriting post:', error)
    }
  }

  const handleShare = async (postId) => {
    try {
      // Copy link to clipboard
      const postUrl = `${window.location.origin}/post/${postId}`
      await navigator.clipboard.writeText(postUrl)
      
      // You could show a toast notification here
      console.log('Post link copied to clipboard!')
      
      // API call to track shares would happen here
      // await rocks.share(postId)
    } catch (error) {
      console.error('Error sharing post:', error)
    }
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleComment = async (postId) => {
    if (!newComment[postId]?.trim()) return

    try {
      await rocks.comment(postId, newComment[postId])
      // Reload the specific post or update comments
      setNewComment(prev => ({ ...prev, [postId]: '' }))
      loadFeed() // Simple approach - reload all posts
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getRockTypeColor = (type) => {
    const colors = {
      igneous: 'bg-red-100 text-red-800',
      sedimentary: 'bg-yellow-100 text-yellow-800',
      metamorphic: 'bg-purple-100 text-purple-800',
      minerals: 'bg-blue-100 text-blue-800',
      fossils: 'bg-green-100 text-green-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading && posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your feed...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rock Spotter Feed</h1>
            <p className="text-gray-600">Discover amazing geological finds from the community</p>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors"
            title="Help & Tips"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Link>
      </div>

      {/* Feed Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex gap-2">
            {[
              { key: 'recent', label: 'Recent', icon: Clock },
              { key: 'popular', label: 'Popular', icon: TrendingUp },
              { key: 'following', label: 'Following', icon: User }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Social Feed Posts */}
      {posts.length === 0 && !loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">Be the first to share a rock discovery!</p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share First Rock
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.userId?.username || 'Rock Explorer'}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatTimeAgo(post.createdAt)}</span>
                        {post.location?.address && (
                          <>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{post.location.address}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Rock Type Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRockTypeColor(post.rockType)}`}>
                    {post.rockType?.charAt(0).toUpperCase() + post.rockType?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.description}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.photo && (
                <div className="relative">
                  <SmartImage
                    src={post.photo}
                    alt={post.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 border-t border-stone-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        userLikes.has(post._id) 
                          ? 'text-red-600' 
                          : 'text-stone-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${userLikes.has(post._id) ? 'fill-current' : ''}`} />
                      <span>{post.likes || 0} likes</span>
                    </button>
                    
                    {/* Comment Button */}
                    <button
                      onClick={() => toggleComments(post._id)}
                      className="flex items-center space-x-2 text-stone-600 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments?.length || 0} comments</span>
                    </button>
                    
                    {/* Repost Button */}
                    <button
                      onClick={() => handleRepost(post._id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        userReposts.has(post._id) 
                          ? 'text-green-600' 
                          : 'text-stone-600 hover:text-green-600'
                      }`}
                    >
                      <Repeat2 className="h-5 w-5" />
                      <span>{post.reposts || 0} reposts</span>
                    </button>
                    
                    {/* Share Button */}
                    <button 
                      onClick={() => handleShare(post._id)}
                      className="flex items-center space-x-2 text-stone-600 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => handleFavorite(post._id)}
                    className={`p-2 rounded-full transition-colors ${
                      userFavorites.has(post._id) 
                        ? 'text-yellow-600 bg-yellow-50' 
                        : 'text-stone-600 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                    title="Add to favorites"
                  >
                    <Bookmark className={`h-5 w-5 ${userFavorites.has(post._id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Comments Section */}
                {showComments[post._id] && (
                  <div className="space-y-4">
                    {/* Add Comment */}
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment[post._id] || ''}
                            onChange={(e) => setNewComment(prev => ({ 
                              ...prev, 
                              [post._id]: e.target.value 
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post._id)
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(post._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-3">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg px-3 py-2">
                                <p className="font-medium text-sm text-gray-900">
                                  {comment.userId?.username || 'Anonymous'}
                                </p>
                                <p className="text-gray-700">{comment.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(comment.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Social Feed Help</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">❤️ Liking Posts</h4>
                <p>Click the heart icon to like posts you find interesting. This helps others discover popular content.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">💬 Comments</h4>
                <p>Click the comment icon to view and add comments. Share your thoughts, ask questions, or provide rock identification tips.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">🔄 Feed Filters</h4>
                <p>Use Recent, Popular, or Following filters to customize your feed. Recent shows newest posts, Popular shows most-liked content.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">📍 Rock Details</h4>
                <p>Each post shows rock type, location, and discovery details. Learn about different geological formations and hunting spots.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">➕ Adding Posts</h4>
                <p>Click "Add Post" to share your own rock discoveries with photos, descriptions, and location details.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialFeed