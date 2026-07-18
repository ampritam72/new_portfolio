import React, { useState } from "react";
import { ThumbsUp, MessageSquare, Repeat, Share2, Globe, MoreHorizontal, MessageCircle, Heart, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LinkedInPost, LinkedInComment } from "../types";

interface LinkedInFeedProps {
  linkedInPosts: LinkedInPost[];
  portraitImage: string | null;
}

export default function LinkedInFeed({ linkedInPosts: initialPosts, portraitImage }: LinkedInFeedProps) {
  const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts);
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>("li-1");
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});

  const handleToggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likes: hasLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleRepost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            reposts: post.reposts + 1
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComment: LinkedInComment = {
            id: `user-lic-${Date.now()}`,
            author: "Portfolio Visitor",
            headline: "Viewer of Abir's Portfolio",
            text,
            date: "Just now",
            likes: 0
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );

    setCommentText(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  const renderLinkedInMedia = (imageType: "ucics" | "robosoccer" | "academic" | "deeplearning") => {
    switch (imageType) {
      case "ucics":
        return (
          <div className="bg-gradient-to-br from-purple-900 to-slate-950 aspect-video w-full relative overflow-hidden flex flex-col justify-between p-6 text-white border-y border-slate-100 font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15))] pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] font-mono tracking-widest uppercase text-purple-300 font-bold">
                UCICS-2025
              </span>
              <span className="text-xs font-mono text-purple-400">Varendra University</span>
            </div>
            <div className="my-auto space-y-3 max-w-lg">
              <h4 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-purple-100 leading-tight">
                International Conference on Ubiquitous Computing and Intelligent Communication Systems
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                Department of CSE • Volunteer Chapter Logistics Team
              </p>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-purple-400 border-t border-purple-500/20 pt-3">
              <span>VOLUNTEER & GRAPHIC LEAD</span>
              <span>EST. 2025</span>
            </div>
          </div>
        );
      case "academic":
        return (
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 aspect-video w-full relative overflow-hidden flex flex-col justify-between p-6 text-white border-y border-slate-100 font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.15))] pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-mono tracking-widest uppercase text-indigo-300 font-bold">
                PROJECT RELEASE
              </span>
              <span className="text-xs font-mono text-indigo-400">academic-x.vercel.app</span>
            </div>
            <div className="my-auto space-y-4">
              <div className="p-4 bg-slate-900/85 backdrop-blur-md rounded-xl border border-indigo-500/20 shadow-lg max-w-md mx-auto space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-[10px] font-mono text-indigo-400 font-bold">AcademicX Dashboard</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-indigo-500/10 rounded" />
                  <div className="h-2 w-5/6 bg-indigo-500/10 rounded" />
                </div>
                <div className="flex justify-between items-center bg-indigo-600/10 px-3 py-1.5 rounded border border-indigo-500/20">
                  <span className="text-[9px] font-mono text-indigo-300 font-bold">Smart Student Hub</span>
                  <span className="text-[10px] font-mono text-white font-bold">React + Vite</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400 border-t border-indigo-500/20 pt-3">
              <span>FIGMA TO FRONTEND</span>
              <span>100% RESPONSIVE</span>
            </div>
          </div>
        );
      case "deeplearning":
        return (
          <div className="bg-gradient-to-br from-violet-950 to-slate-950 aspect-video w-full relative overflow-hidden flex flex-col justify-between p-6 text-white border-y border-slate-100 font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.15))] pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded bg-violet-500/20 border border-violet-500/30 text-[10px] font-mono tracking-widest uppercase text-violet-300 font-bold">
                HYBRID PIPELINE
              </span>
              <span className="text-xs font-mono text-violet-400">CNN-ViT Architecture</span>
            </div>
            
            <div className="my-auto flex justify-center items-center space-x-4 max-w-sm mx-auto">
              <div className="bg-violet-900/30 border border-violet-500/20 px-3 py-3 rounded-lg text-center flex-1">
                <span className="text-[11px] font-mono font-bold block text-violet-300">CNN Blocks</span>
                <span className="text-[8px] text-slate-400 block mt-1">Spatial Features</span>
              </div>
              <div className="text-violet-400 font-mono font-bold text-lg">➔</div>
              <div className="bg-fuchsia-900/30 border border-fuchsia-500/20 px-3 py-3 rounded-lg text-center flex-1">
                <span className="text-[11px] font-mono font-bold block text-fuchsia-300">Transformer</span>
                <span className="text-[8px] text-slate-400 block mt-1">Global Context</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-violet-400 border-t border-violet-500/20 pt-3">
              <span>EXPLAINABLE AI DIAGNOSTICS</span>
              <span>VAL_ACC: 97.4%</span>
            </div>
          </div>
        );
      case "robosoccer":
        return (
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 aspect-video w-full relative overflow-hidden flex flex-col justify-between p-6 text-white border-y border-slate-100 font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12))] pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono tracking-widest uppercase text-emerald-300 font-bold">
                VU TECH CARNIVAL
              </span>
              <span className="text-xs font-mono text-emerald-400">Department of CSE</span>
            </div>
            <div className="my-auto text-center space-y-2">
              <div className="w-12 h-12 rounded-full border border-dashed border-emerald-500/50 flex items-center justify-center mx-auto bg-emerald-500/5">
                <div className="w-6 h-6 rounded-full bg-emerald-500 animate-pulse flex items-center justify-center font-bold text-[10px] text-slate-900">
                  GOAL
                </div>
              </div>
              <h5 className="font-serif font-bold text-base text-emerald-100">RoboSoccer Arena 2024</h5>
              <p className="text-[10px] text-slate-300 font-mono">Volunteer Support & Field Relays Coordination</p>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400 border-t border-emerald-500/20 pt-3">
              <span>EMBEDDED AUTOMATION</span>
              <span>VU TECH CHAMPIONS</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {posts.map((post) => (
        <div 
          key={post.id}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col transition-all duration-300"
        >
          {/* Post Header */}
          <div className="p-4 flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={portraitImage || "/src/assets/images/abir_artistic_portrait_1784339951787.jpg"} 
                  alt={post.author} 
                  className="w-12 h-12 rounded-full object-cover border border-purple-100 shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors">
                    {post.author}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono font-bold">1st</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight line-clamp-1 max-w-[280px] sm:max-w-[420px] font-sans">
                  {post.headline}
                </p>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-sans mt-0.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <Globe size={11} className="text-slate-400" />
                </div>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* Post Text */}
          <div className="px-4 pb-3">
            <p className="text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
              {post.text}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {post.hashtags.map((tag, idx) => (
                <span key={idx} className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Media Attachment */}
          <div className="bg-slate-50">
            {renderLinkedInMedia(post.imageType)}
          </div>

          {/* Reaction counts */}
          <div className="px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 font-sans">
            <div className="flex items-center space-x-1.5">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white text-white">
                  <ThumbsUp size={8} fill="currentColor" />
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white text-white">
                  <Heart size={8} fill="currentColor" />
                </div>
              </div>
              <span className="font-medium">{post.likes} reactions</span>
            </div>
            <div className="flex items-center space-x-2.5 font-medium">
              <button 
                onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                className="hover:text-blue-600 hover:underline cursor-pointer"
              >
                {post.comments.length} comments
              </button>
              <span>•</span>
              <span>{post.reposts} reposts</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="px-2 py-1 flex items-center justify-around text-slate-600 font-sans text-xs sm:text-sm border-b border-slate-100">
            <button 
              onClick={() => handleToggleLike(post.id)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer hover:bg-slate-50 ${post.hasLiked ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"}`}
            >
              <ThumbsUp size={16} fill={post.hasLiked ? "currentColor" : "none"} />
              <span>Like</span>
            </button>
            <button 
              onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer hover:bg-slate-50 ${activeCommentsPostId === post.id ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-800"}`}
            >
              <MessageSquare size={16} />
              <span>Comment</span>
            </button>
            <button 
              onClick={() => handleRepost(post.id)}
              className="flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Repeat size={16} />
              <span>Repost</span>
            </button>
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Share2 size={16} />
              <span>Send</span>
            </a>
          </div>

          {/* Comment Section (Collapsible/Interactive) */}
          <AnimatePresence>
            {activeCommentsPostId === post.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-50/70 p-4 space-y-4 overflow-hidden"
              >
                {/* Write Comment Box */}
                <div className="flex items-start space-x-3 pt-1">
                  <img 
                    src={portraitImage || "/src/assets/images/abir_artistic_portrait_1784339951787.jpg"} 
                    alt="Active User" 
                    className="w-8.5 h-8.5 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 relative flex items-center">
                    <input 
                      type="text"
                      value={commentText[post.id] || ""}
                      onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Add a comment on this post..."
                      className="w-full text-xs sm:text-sm bg-white border border-slate-200 focus:border-blue-500 focus:outline-none rounded-full px-4.5 py-2.5 pr-12 transition-all shadow-inner font-sans text-slate-800"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(post.id);
                      }}
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="absolute right-2 p-1 text-blue-600 hover:text-blue-800 rounded-full transition-colors cursor-pointer"
                      title="Post comment"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Comment List */}
                <div className="space-y-3 pt-2">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-100 border border-slate-200/80 flex items-center justify-center font-sans text-xs font-bold text-slate-700 select-none shrink-0">
                        {comment.author.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <div className="bg-slate-100 rounded-2xl px-3.5 py-2 border border-slate-200/40">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-bold text-slate-900 font-sans hover:underline cursor-pointer">
                              {comment.author}
                            </span>
                            <span className="text-[9px] text-slate-400 font-sans">{comment.date}</span>
                          </div>
                          <span className="text-[9px] text-slate-500 font-sans block leading-tight">{comment.headline}</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans mt-2 whitespace-pre-wrap">
                            {comment.text}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-sans mt-1 px-1">
                          <button className="hover:text-blue-600 hover:underline font-bold cursor-pointer">Like</button>
                          <span>•</span>
                          <span>{comment.likes} Likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {post.comments.length === 0 && (
                    <div className="text-center py-4 text-slate-400 font-sans text-xs">
                      No comments yet. Be the first to comment on Abir's post!
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
